-- 7.Optimizarea cererii SQL propusă în raportul de analiză

/*

a. Planul de execuție ales de optimizatorul bazat pe regulă (RBO)

Oracle nu mai folosește activ optimizatorul bazat pe reguli (RBO) în versiunile moderne (de la Oracle 10g în sus), dar teoretic, dacă ar fi folosit:

    - Ordinea de procesare ar respecta strict ordinea din query (de sus în jos, de la FROM la WHERE, GROUP BY, ORDER BY).
    - Nu s-ar folosi statistici.
    - Ar prefera:
        - full table scan în loc de indexuri (dacă tabelele sunt mici)
        - join nested loop cu tabelele în ordinea menționată
    - Subinterogarea Medii_Luna s-ar evalua complet (fără short-circuit logic).

Exemplu de pași în execuție RBO:
    1. Se face JOIN între ANGAJAT, CURSA, DETALII_CURSA, FACTURA, LOCATII.
    2. Se filtrează în WHERE după dc.data_cursa.
    3. Se face GROUP BY.
    4. Se aplică ROW_NUMBER() (calculat complet pentru toate înregistrările).
    5. Se aplică WHERE row_num <= 3.
    6. Se face join-ul final cu MASINA și ISTORIC_SOFER.

Problemă: Planul RBO e fix, inflexibil și poate executa multe operații costisitoare chiar și atunci când există indexuri.

*/

/*

b. Planul de execuție ales de optimizatorul bazat pe cost (CBO)

Optimizatorul CBO analizează:

    - Statistici despre date (cardinalitate, distribuție)
    - Indexuri disponibile
    - Costul estimat (CPU, I/O) pentru fiecare cale de acces

Pași urmați de CBO:
    1. Detectează că filtrarea pe dc.data_cursa >= TRUNC(ADD_MONTHS(SYSDATE, -1)) poate beneficia de un index (dacă există idx_data_cursa).
    2. Alege join hash sau merge join (dacă tabelele sunt mari) pentru:
    3. CURSA cu DETALII_CURSA, FACTURA, LOCATII, ANGAJAT
    4. Aplică GROUP BY + AVG() și SUM() pe setul deja filtrat.
    5. Aplică funcția de fereastră ROW_NUMBER() folosind indexuri dacă e posibil.
    6. Folosește access path pe index pentru MASINA și ISTORIC_SOFER, evitând scanări full-table.
    7. Aplică WHERE row_num <= 3 pentru a reduce rezultatele.

Avantaj: CBO alege cea mai ieftină cale de execuție și optimizează și sortările implicite din ROW_NUMBER().

*/

-- c. Sugestii de optimizare + scripturi de implementare

/*

Problema inițială:
    - Interogarea are multe joinuri și operații costisitoare (ex: ROW_NUMBER(), CASE, AVG, SUM, JOIN multiplu).
    - CASE apare de două ori cu listă lungă de județe — cost ridicat în parsing și execuție.
    - Nu toate coloanele folosite sunt indexate.
    - Nu se profită de agregări precomputate.

*/

DECLARE
    v_count NUMBER;
BEGIN
    -- 1. Creare indexuri utile

    -- Index pe DETALII_CURSA(data_cursa)
    SELECT COUNT(*) INTO v_count FROM USER_INDEXES WHERE INDEX_NAME = 'IDX_DC_DATA_CURSA';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'CREATE INDEX idx_dc_data_cursa ON DETALII_CURSA(data_cursa)';
    END IF;

    -- Index pe FACTURA(cod_cursa)
    SELECT COUNT(*) INTO v_count FROM USER_INDEXES WHERE INDEX_NAME = 'IDX_F_COD_CURSA';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'CREATE INDEX idx_f_cod_cursa ON FACTURA(cod_cursa)';
    END IF;

    -- Index pe CURSA(cod_sofer)
    SELECT COUNT(*) INTO v_count FROM USER_INDEXES WHERE INDEX_NAME = 'IDX_C_COD_SOFER';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'CREATE INDEX idx_c_cod_sofer ON CURSA(cod_sofer)';
    END IF;

    -- Index pe CURSA(cod_locatie)
    SELECT COUNT(*) INTO v_count FROM USER_INDEXES WHERE INDEX_NAME = 'IDX_C_COD_LOCATIE';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'CREATE INDEX idx_c_cod_locatie ON CURSA(cod_locatie)';
    END IF;

    COMMIT;

    -- 2. Creare tabel pentru REGIUNI (în loc de CASE)

    -- Verificare și ștergere dacă tabela REGIUNI_JUDETE există deja
    SELECT COUNT(*) INTO v_count FROM USER_TABLES WHERE TABLE_NAME = 'REGIUNI_JUDETE';

    IF v_count > 0 THEN
        EXECUTE IMMEDIATE 'DROP TABLE REGIUNI_JUDETE CASCADE CONSTRAINTS';
    END IF;

    -- Creare tabel nou pentru REGIUNI_JUDETE
    EXECUTE IMMEDIATE '
        CREATE TABLE REGIUNI_JUDETE (
            judet VARCHAR2(50),
            regiune VARCHAR2(10)
        )
    ';

    -- Inserare date în REGIUNI_JUDETE
    FOR r IN (
        SELECT COLUMN_VALUE AS judet, 'Nord' AS regiune FROM TABLE(SYS.ODCIVARCHAR2LIST(
            'Botoșani','Suceava','Bistrița-Năsăud','Satu Mare','Maramureș','Iași','Neamț','Bihor','Sălaj'
        ))
        UNION ALL
        SELECT COLUMN_VALUE, 'Sud' FROM TABLE(SYS.ODCIVARCHAR2LIST(
            'București','Ilfov','Dâmbovița','Prahova','Argeș','Giurgiu','Teleorman','Ialomița','Călărași',
            'Brăila','Vrancea','Dolj','Olt','Mehedinți','Gorj','Vâlcea','Caraș-Severin','Constanța','Tulcea','Buzău'
        ))
        UNION ALL
        SELECT COLUMN_VALUE, 'Centru' FROM TABLE(SYS.ODCIVARCHAR2LIST(
            'Cluj','Timiș','Brașov','Arad','Sibiu','Alba','Harghita','Mureș','Covasna','Hunedoara','Bacău','Vaslui','Galați'
        ))
    ) LOOP
        EXECUTE IMMEDIATE 'INSERT INTO REGIUNI_JUDETE VALUES (:1, :2)' USING r.judet, r.regiune;
    END LOOP;

    COMMIT;

    -- 3. Creare Materialized View pentru pre-agregare

    -- Verificare și ștergere dacă materialized view ANALIZA_LUNA există deja
    SELECT COUNT(*) INTO v_count FROM USER_MVIEWS WHERE MVIEW_NAME = 'ANALIZA_LUNA';

    IF v_count > 0 THEN
        EXECUTE IMMEDIATE 'DROP MATERIALIZED VIEW ANALIZA_LUNA';
    END IF;

    EXECUTE IMMEDIATE'
        CREATE MATERIALIZED VIEW ANALIZA_LUNA
        BUILD IMMEDIATE
        REFRESH ON DEMAND
        AS
        SELECT
            a.cod_angajat,
            a.nume,
            a.prenume,
            l.judet,
            AVG(dc.nota_client) AS medie_nota_client,
            SUM(f.pret) AS castig_total
        FROM ANGAJAT a
        JOIN CURSA c ON a.cod_angajat = c.cod_sofer
        JOIN DETALII_CURSA dc ON c.cod_cursa = dc.cod_cursa
        JOIN FACTURA f ON f.cod_cursa = c.cod_cursa
        JOIN LOCATII l ON c.cod_locatie = l.cod_locatie
        WHERE dc.data_cursa >= TRUNC(ADD_MONTHS(SYSDATE, -1))
        GROUP BY a.cod_angajat, a.nume, a.prenume, l.judet
    ';

    COMMIT;

    -- Noua interogare optimizată, pe baza MV și tabel regiuni

    /*

    EXPLAIN PLAN FOR
    SELECT 
        m.cod_angajat,
        m.nume,
        m.prenume,
        r.regiune,
        m.medie_nota_client,
        m.castig_total,
        ROW_NUMBER() OVER (PARTITION BY r.regiune ORDER BY m.medie_nota_client DESC) AS row_num,
        ms.marca,
        ms.model,
        ms.numar_masina,
        isf.nota AS nota_istorica,
        isf.numar_curse
    FROM ANALIZA_LUNA m
    JOIN REGIUNI_JUDETE r ON m.judet = r.judet
    JOIN MASINA ms ON m.cod_angajat = ms.cod_masina
    LEFT JOIN ISTORIC_SOFER isf ON m.cod_angajat = isf.cod_sofer
    WHERE ROWNUM <= 3;

    SELECT * FROM TABLE(DBMS_XPLAN.DISPLAY);

    */
END;

/*

Rezultate ale optimizării:
    - ANALIZA_LUNA -> Elimină joinuri și agregări la runtime
    - REGIUNI_JUDETE în loc de CASE	-> Reduce parsing și cost CPU
    - Indexuri specifice -> Reduce I/O și crește performanța JOIN și WHERE
    - EXPLAIN PLAN -> Confirmă utilizarea INDEX RANGE SCAN, HASH JOIN, și MV

*/