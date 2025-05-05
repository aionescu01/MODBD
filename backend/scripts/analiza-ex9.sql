/*
Afișează primii 3 șoferi din fiecare regiune (Nord, Sud, Central), care au avut cele mai mari medii ale notelor acordate de clienți în 
ultima lună, împreună cu detalii despre mașina folosită, câștigurile totale din acea perioadă și comparația cu performanța lor istorică.
*/

BEGIN
  EXECUTE IMMEDIATE '
    CREATE OR REPLACE VIEW ANALIZA_EX7 AS
    WITH Medii_Luna AS (
        SELECT
            a.cod_angajat,
            a.nume,
            a.prenume,
            l.judet,
            AVG(dc.nota_client) AS medie_nota_client,
            SUM(f.pret) AS castig_total,
            ROW_NUMBER() OVER (PARTITION BY 
                CASE 
                    WHEN l.judet IN (''Botoșani'', ''Suceava'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Iași'', ''Neamț'', ''Bihor'', ''Sălaj'') THEN ''Nord''
                    WHEN l.judet IN (''București'', ''Ilfov'', ''Dâmbovița'', ''Prahova'', ''Argeș'', ''Giurgiu'', ''Teleorman'', ''Ialomița'', ''Călărași'', ''Brăila'', ''Vrancea'', ''Dolj'', ''Olt'', ''Mehedinți'', ''Gorj'', ''Vâlcea'', ''Caraș-Severin'', ''Constanța'', ''Tulcea'', ''Buzău'') THEN ''Sud''
                    ELSE ''Centru''
                END
                ORDER BY AVG(dc.nota_client) DESC) AS row_num
        FROM ANGAJAT a
        JOIN CURSA c ON a.cod_angajat = c.cod_sofer
        JOIN DETALII_CURSA dc ON c.cod_cursa = dc.cod_cursa
        JOIN FACTURA f ON f.cod_cursa = c.cod_cursa
        JOIN LOCATII l ON c.cod_locatie = l.cod_locatie
        WHERE dc.data_cursa >= TRUNC(ADD_MONTHS(SYSDATE, -1))
        GROUP BY a.cod_angajat, a.nume, a.prenume, l.judet
    )
    SELECT 
        m.cod_angajat,
        m.nume,
        m.prenume,
        m.judet,
        CASE 
            WHEN m.judet IN (''Botoșani'', ''Suceava'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Iași'', ''Neamț'', ''Bihor'', ''Sălaj'') THEN ''Nord''
            WHEN m.judet IN (''București'', ''Ilfov'', ''Dâmbovița'', ''Prahova'', ''Argeș'', ''Giurgiu'', ''Teleorman'', ''Ialomița'', ''Călărași'', ''Brăila'', ''Vrancea'', ''Dolj'', ''Olt'', ''Mehedinți'', ''Gorj'', ''Vâlcea'', ''Caraș-Severin'', ''Constanța'', ''Tulcea'', ''Buzău'') THEN ''Sud''
            ELSE ''Centru''
        END AS regiune,
        m.medie_nota_client,
        m.castig_total,
        m.row_num,
        ms.marca,
        ms.model,
        ms.numar_masina,
        isf.nota AS nota_istorica,
        isf.numar_curse
    FROM Medii_Luna m
    JOIN MASINA ms ON m.cod_angajat = ms.cod_masina
    LEFT JOIN ISTORIC_SOFER isf ON m.cod_angajat = isf.cod_sofer
    WHERE m.row_num <= 3
    ORDER BY regiune, m.row_num
  ';

  COMMIT;
END;

/*

Posibile tehnici de optimizare:

1. PUSH DOWN SELECT (filtrarea în fragmente)
    - În cererea formulată, condiția dc.data_cursa >= TRUNC(ADD_MONTHS(SYSDATE, -1)) poate fi aplicată direct în fiecare fragment individual (DETALII_CURSA_NORD, DETALII_CURSA_SUD etc.), astfel încât să fie transmise către orchestrator doar cursele recente, din ultima lună.

    - Avantajul principal al acestei tehnici este reducerea semnificativă a volumului de date transferat între fragmente și orchestrator, ceea ce duce la o creștere a performanței generale, mai ales în cazul unor volume mari de date istorice.

    - Dezavantajul constă în necesitatea ca sistemul distribuit (middleware sau orchestrator SQL) să suporte optimizări locale în fragmente. De asemenea, pot apărea inconsistențe dacă filtrarea temporală este aplicată diferit între fragmente.

2. SEMANTIC QUERY REWRITING (acces doar la fragmente relevante)
    - Această tehnică presupune reformularea interogării pentru a accesa doar fragmentele de date relevante, pe baza unor metadate cunoscute – în acest caz, repartizarea județelor pe regiuni (ex. Nord, Sud, Centru). Se pot interoga doar tabelele CURSA_NORD, LOCATII_NORD, etc., evitând astfel accesul la fragmente irelevante precum LOCATII_SUD.

    - Principalul avantaj este reducerea numărului de operații JOIN și a dimensiunii setului de date procesat, ceea ce duce la un timp de execuție mai mic și o utilizare eficientă a resurselor.

    - Dezavantajul apare în cazul în care metadatele nu sunt bine întreținute sau dacă se schimbă periodic repartizarea județelor pe regiuni – ceea ce ar necesita modificarea manuală a interogărilor sau o soluție dinamică suplimentară.

3. JOIN LOCALLY, SHIP SELECTIVELY
    - În această strategie, operațiile JOIN dintre tabele precum ANGAJAT, CURSA, DETALII_CURSA, FACTURA se realizează local, în cadrul fiecărui fragment de date (de exemplu, în regiunea Nord). După aplicarea filtrărilor și agregărilor, doar rezultatele filtrate (cum ar fi top 3 șoferi după câștiguri) sunt transmise către orchestratorul global pentru consolidare finală.

    - Această abordare reduce considerabil traficul în rețea și permite scalarea eficientă pe volume mari de date.

    - Totuși, este necesară o sincronizare clară între fragmente – tabelele trebuie să aibă structuri uniforme. De asemenea, tehnica poate fi dificil de aplicat dacă anumite tabele implicate (cum ar fi ISTORIC_SOFER) nu sunt replicate sau nu pot fi accesate local în fiecare fragment.

4. MATERIALIZED VIEWS (vederi materializate)
    - Pentru optimizarea cererilor complexe, se pot crea vederi materializate în fiecare fragment, care să stocheze deja datele agregate relevante (media notelor, câștigurile, informațiile despre mașini etc.). Acestea pot fi actualizate periodic (zilnic sau săptămânal) pentru a oferi timpi de răspuns mult mai buni în interogările frecvente.

    - Avantajul acestei tehnici este execuția rapidă a interogărilor, fiind ideală pentru rapoarte sau dashboarduri recurente.

    - Principalul dezavantaj constă în costurile asociate sincronizării și întreținerii vederilor, precum și în riscul apariției unor inconsistențe temporare (în funcție de frecvența de actualizare).

Recomandare combinată: Pentru optimizarea cererii analizate, se recomandă o strategie hibridă care combină mai multe tehnici complementare:

    - Aplicarea filtrării temporale direct în fragmente (PUSH DOWN SELECT);

    - Reformularea semantică a cererii pentru a accesa doar fragmentele geografice relevante (SEMANTIC QUERY REWRITING);

    - Execuția JOIN-urilor la nivel local, urmată de trimiterea selectivă a rezultatelor relevante (JOIN LOCALLY, SHIP SELECTIVELY);

    - Utilizarea vederilor materializate în cazurile în care aceeași cerere este rulată frecvent (MATERIALIZED VIEWS).

Această abordare asigură o eficiență ridicată atât din punct de vedere al performanței, cât și al scalabilității într-un sistem distribuit.

*/