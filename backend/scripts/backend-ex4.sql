BEGIN
    -- a.transparență pentru fragmentele verticale

    /*

    Definiție: Fragmentarea verticală presupune stocarea unor atribute ale aceleiași entități în tabele diferite, păstrând o cheie comună (de obicei PK).

    Soluție: utilizarea de vederi (views) care reconstruiesc entitatea originală.

    */

    -- Reconstruirea tabelei CLIENT

    EXECUTE IMMEDIATE '
        CREATE OR REPLACE VIEW CLIENT_VERTICAL AS
        SELECT
            ID.cod_client,
            ID.nume,
            ID.prenume,
            HR.data_nastere,
            HR.nota,
            CONTACT.nr_telefon,
            CONTACT.apelativ
        FROM
            CLIENT_IDENTITY@central_link ID
            JOIN CLIENT_PROFIL@arhiva_link HR ON ID.cod_client = HR.cod_client
            JOIN CLIENT_CONTACT@nord_link CONTACT ON ID.cod_client = CONTACT.cod_client
        UNION
        SELECT
            ID.cod_client,
            ID.nume,
            ID.prenume,
            HR.data_nastere,
            HR.nota,
            CONTACT.nr_telefon,
            CONTACT.apelativ
        FROM
            CLIENT_IDENTITY@central_link ID
            JOIN CLIENT_PROFIL@arhiva_link HR ON ID.cod_client = HR.cod_client
            JOIN CLIENT_CONTACT@sud_link CONTACT ON ID.cod_client = CONTACT.cod_client
    ';

    -- Reconstruirea tabelei ANGAJAT

    EXECUTE IMMEDIATE '
        CREATE OR REPLACE VIEW ANGAJAT_VERTICAL AS
        SELECT
            AID.cod_angajat,
            AID.nume,
            AID.prenume,
            HR.data_nastere,
            HR.data_angajare,
            HR.salariu,
            CONTACT.nr_telefon,
            CONTACT.tip_angajat,
            HR.cod_masina
        FROM
            ANGAJAT_IDENTITY@central_link AID
            JOIN ANGAJAT_HR@arhiva_link HR ON AID.cod_angajat = HR.cod_angajat
            JOIN ANGAJAT_CONTACT@nord_link CONTACT ON AID.cod_angajat = CONTACT.cod_angajat
        UNION
        SELECT
            AID.cod_angajat,
            AID.nume,
            AID.prenume,
            HR.data_nastere,
            HR.data_angajare,
            HR.salariu,
            CONTACT.nr_telefon,
            CONTACT.tip_angajat,
            HR.cod_masina
        FROM
            ANGAJAT_IDENTITY@central_link AID
            JOIN ANGAJAT_HR@arhiva_link HR ON AID.cod_angajat = HR.cod_angajat
            JOIN ANGAJAT_CONTACT@sud_link CONTACT ON AID.cod_angajat = CONTACT.cod_angajat
    ';

    -- b. Transparență pentru fragmentele orizontale

    /*

    Definiție: Fragmentarea orizontală presupune stocarea rândurilor unei tabele în fragmente diferite, după o condiție de selecție (de ex: judet).

    Soluție: folosirea de vederi unificate (UNION ALL) care refac întregul set de date.

    */

    -- Reconstruirea tabelei LOCATII
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE VIEW LOCATII_ORIZONTAL AS
        SELECT * FROM LOCATII_NORD@nord_link
        UNION ALL
        SELECT * FROM LOCATII_SUD@sud_link
        UNION ALL
        SELECT * FROM LOCATII_CENTRAL@central_link
    ';

    -- Reconstruirea tabelei ANGAJAT
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE VIEW ANGAJAT_ORIZONTAL AS
        SELECT * FROM ANGAJAT_NORD@nord_link
        UNION ALL
        SELECT * FROM ANGAJAT_SUD@sud_link
        UNION ALL
        SELECT * FROM ANGAJAT_CENTRAL@central_link
    ';

    -- Reconstruirea tabelei CURSA
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE VIEW CURSA_ORIZONTAL AS
        SELECT * FROM CURSA_NORD@nord_link
        UNION ALL
        SELECT * FROM CURSA_SUD@sud_link
        UNION ALL
        SELECT * FROM CURSA_CENTRAL@central_link
    ';

    -- Reconstruirea tabelei DETALII_CURSA
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE VIEW DETALII_CURSA_ORIZONTAL AS
        SELECT * FROM DETALII_CURSA_NORD@nord_link
        UNION ALL
        SELECT * FROM DETALII_CURSA_SUD@sud_link
        UNION ALL
        SELECT * FROM DETALII_CURSA_CENTRAL@central_link
    ';
    
    -- c. Transparență pentru tabelele stocate în altă bază de date decât cea la care se conectează aplicația

    /*

    Definiție: Aplicația vede toate tabelele ca fiind în aceeași bază, chiar dacă ele sunt în baze externe.

    Soluție: utilizarea de database links și/sau sinonime (synonyms)

    */

    -- Crearea de sinonime in OLTP catre tabelele din celelalte baze de date
    
    EXECUTE IMMEDIATE '
        DECLARE
            v_count NUMBER;
            
            PROCEDURE create_synonym_if_not_exists(syn_name VARCHAR2, target VARCHAR2) IS
            BEGIN
                SELECT COUNT(*) INTO v_count 
                FROM USER_SYNONYMS 
                WHERE SYNONYM_NAME = UPPER(syn_name);
                
                IF v_count = 0 THEN
                    EXECUTE IMMEDIATE ''CREATE SYNONYM '' || syn_name || '' FOR '' || target;
                END IF;
            END;
        BEGIN
            -- CLIENT
            create_synonym_if_not_exists(''CLIENT_IDENTITY'', ''CLIENT_IDENTITY@central_link'');
            create_synonym_if_not_exists(''CLIENT_PROFIL'', ''CLIENT_PROFIL@arhiva_link'');
            create_synonym_if_not_exists(''CLIENT_CONTACT_NORD'', ''CLIENT_CONTACT@nord_link'');
            create_synonym_if_not_exists(''CLIENT_CONTACT_SUD'', ''CLIENT_CONTACT@sud_link'');

            -- ANGAJAT
            create_synonym_if_not_exists(''ANGAJAT_IDENTITY'', ''ANGAJAT_IDENTITY@central_link'');
            create_synonym_if_not_exists(''ANGAJAT_HR'', ''ANGAJAT_HR@arhiva_link'');
            create_synonym_if_not_exists(''ANGAJAT_CONTACT_NORD'', ''ANGAJAT_CONTACT@nord_link'');
            create_synonym_if_not_exists(''ANGAJAT_CONTACT_SUD'', ''ANGAJAT_CONTACT@sud_link'');

            -- LOCATII
            create_synonym_if_not_exists(''LOCATII_NORD'', ''LOCATII_NORD@nord_link'');
            create_synonym_if_not_exists(''LOCATII_SUD'', ''LOCATII_SUD@sud_link'');
            create_synonym_if_not_exists(''LOCATII_CENTRAL'', ''LOCATII_CENTRAL@central_link'');

            -- CURSA
            create_synonym_if_not_exists(''CURSA_NORD'', ''CURSA_NORD@nord_link'');
            create_synonym_if_not_exists(''CURSA_SUD'', ''CURSA_SUD@sud_link'');
            create_synonym_if_not_exists(''CURSA_CENTRAL'', ''CURSA_CENTRAL@central_link'');

            -- DETALII_CURSA
            create_synonym_if_not_exists(''DETALII_CURSA_NORD'', ''DETALII_CURSA_NORD@nord_link'');
            create_synonym_if_not_exists(''DETALII_CURSA_SUD'', ''DETALII_CURSA_SUD@sud_link'');
            create_synonym_if_not_exists(''DETALII_CURSA_CENTRAL'', ''DETALII_CURSA_CENTRAL@central_link'');

            -- MESAJ
            create_synonym_if_not_exists(''MESAJ'', ''MESAJ@arhiva_link'');
        END;
    ';

    EXECUTE IMMEDIATE 'COMMIT';
END;
