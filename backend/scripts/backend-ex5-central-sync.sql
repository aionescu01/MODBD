-- 5.Asigurarea sincronizării datelor pentru relațiile replicate

DECLARE
    v_exists NUMBER := 0;
    v_count NUMBER := 0;
BEGIN
    SELECT COUNT(*) INTO v_exists
    FROM user_tables
    WHERE table_name = 'SYNC_JOBS';

    IF v_exists = 1 THEN
        EXECUTE IMMEDIATE 'DROP TABLE SYNC_JOBS CASCADE CONSTRAINTS';
    END IF;

    EXECUTE IMMEDIATE '
        CREATE TABLE SYNC_JOBS (
            id         NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
            entitate   VARCHAR2(30),
            cod        VARCHAR2(50),
            operatie   VARCHAR2(10), -- INSERT / UPDATE / DELETE
            payload    CLOB,
            created_at DATE DEFAULT SYSDATE
        )
    ';

    EXECUTE IMMEDIATE'
        CREATE OR REPLACE PACKAGE pkg_sync_ctx AS
            PROCEDURE start_sync;
            PROCEDURE end_sync;
            FUNCTION is_sync RETURN BOOLEAN;
        END;
    ';

    EXECUTE IMMEDIATE'
        CREATE OR REPLACE PACKAGE BODY pkg_sync_ctx AS
            PROCEDURE start_sync IS
            BEGIN
                DBMS_SESSION.set_context(''sync_ctx'', ''is_sync'', ''1'');
            END;

            PROCEDURE end_sync IS
            BEGIN
                DBMS_SESSION.set_context(''sync_ctx'', ''is_sync'', ''0'');
            END;

            FUNCTION is_sync RETURN BOOLEAN IS
            BEGIN
                RETURN SYS_CONTEXT(''sync_ctx'', ''is_sync'') = ''1'';
            END;
        END;
    ';

    EXECUTE IMMEDIATE '
        CREATE CONTEXT sync_ctx USING pkg_sync_ctx
    ';

    -- Triggeri sync ANGAJAT_IDENTITY

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU UPDATE ANGAJAT_IDENTITY
        CREATE OR REPLACE TRIGGER trg_upd_angajat_identity
        AFTER UPDATE ON ANGAJAT_IDENTITY
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "nume": "'' || :NEW.nume ||
                            ''", "prenume": "'' || :NEW.prenume || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''ANGAJAT_IDENTITY'', :NEW.cod_angajat, ''UPDATE'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU DELETE ANGAJAT_IDENTITY
        CREATE OR REPLACE TRIGGER trg_del_angajat_identity
        AFTER DELETE ON ANGAJAT_IDENTITY
        FOR EACH ROW
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''ANGAJAT_IDENTITY'', :OLD.cod_angajat, ''DELETE'', NULL);
        END;
    ';

    -- Triggeri sync ANGAJAT_CENTRAL

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU INSERT ANGAJAT_CENTRAL
        CREATE OR REPLACE TRIGGER trg_ins_angajat_central
        AFTER INSERT ON ANGAJAT_CENTRAL
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "nume": "'' || :NEW.nume ||
                            ''", "prenume": "'' || :NEW.prenume ||
                            ''", "nr_telefon": "'' || :NEW.nr_telefon ||
                            ''", "tip_angajat": "'' || :NEW.tip_angajat ||
                            ''", "data_nastere": "'' || TO_CHAR(:NEW.data_nastere, ''YYYY-MM-DD'') ||
                            ''", "data_angajare": "'' || TO_CHAR(:NEW.data_angajare, ''YYYY-MM-DD'') ||
                            ''", "salariu": "'' || :NEW.salariu ||
                            ''", "cod_masina": "'' || :NEW.cod_masina || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''ANGAJAT_CENTRAL'', :NEW.cod_angajat, ''INSERT'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU UPDATE ANGAJAT_CENTRAL
        CREATE OR REPLACE TRIGGER trg_upd_angajat_central
        AFTER UPDATE ON ANGAJAT_CENTRAL
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "nume": "'' || :NEW.nume ||
                            ''", "prenume": "'' || :NEW.prenume ||
                            ''", "nr_telefon": "'' || :NEW.nr_telefon ||
                            ''", "tip_angajat": "'' || :NEW.tip_angajat ||
                            ''", "data_nastere": "'' || TO_CHAR(:NEW.data_nastere, ''YYYY-MM-DD'') ||
                            ''", "data_angajare": "'' || TO_CHAR(:NEW.data_angajare, ''YYYY-MM-DD'') ||
                            ''", "salariu": "'' || :NEW.salariu ||
                            ''", "cod_masina": "'' || :NEW.cod_masina || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''ANGAJAT_CENTRAL'', :NEW.cod_angajat, ''UPDATE'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU DELETE ANGAJAT_CENTRAL
        CREATE OR REPLACE TRIGGER trg_del_angajat_central
        AFTER DELETE ON ANGAJAT_CENTRAL
        FOR EACH ROW
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''ANGAJAT_CENTRAL'', :OLD.cod_angajat, ''DELETE'', NULL);
        END;
    ';

    -- Triggeri sync CLIENT_IDENTITY

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU UPDATE CLIENT_IDENTITY
        CREATE OR REPLACE TRIGGER trg_upd_client_identity
        AFTER UPDATE ON CLIENT_IDENTITY
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "nume": "'' || :NEW.nume ||
                            ''", "prenume": "'' || :NEW.prenume || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''CLIENT'', :NEW.cod_client, ''UPDATE'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU DELETE CLIENT_IDENTITY
        CREATE OR REPLACE TRIGGER trg_del_client_identity
        AFTER DELETE ON CLIENT_IDENTITY
        FOR EACH ROW
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''CLIENT'', :OLD.cod_client, ''DELETE'', NULL);
        END;
    ';

    -- Triggeri sync CURSA_CENTRAL

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU INSERT CURSA_CENTRAL
        CREATE OR REPLACE TRIGGER trg_ins_cursa_central
        AFTER INSERT ON CURSA_CENTRAL
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "cod_masina": "'' || :NEW.cod_masina ||
                            ''", "cod_sofer": "'' || :NEW.cod_sofer ||
                            ''", "cod_client": "'' || :NEW.cod_client ||
                            ''", "adresa_client": "'' || :NEW.adresa_client ||
                            ''", "destinatie": "'' || :NEW.destinatie ||
                            ''", "cod_locatie": "'' || :NEW.cod_locatie || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''CURSA'', :NEW.cod_cursa, ''INSERT'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU UPDATE CURSA_CENTRAL
        CREATE OR REPLACE TRIGGER trg_upd_cursa_central
        AFTER UPDATE ON CURSA_CENTRAL
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "cod_masina": "'' || :NEW.cod_masina ||
                            ''", "cod_sofer": "'' || :NEW.cod_sofer ||
                            ''", "cod_client": "'' || :NEW.cod_client ||
                            ''", "adresa_client": "'' || :NEW.adresa_client ||
                            ''", "destinatie": "'' || :NEW.destinatie ||
                            ''", "cod_locatie": "'' || :NEW.cod_locatie || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''CURSA'', :NEW.cod_cursa, ''UPDATE'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU DELETE CURSA_CENTRAL
        CREATE OR REPLACE TRIGGER trg_del_cursa_central
        AFTER DELETE ON CURSA_CENTRAL
        FOR EACH ROW
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''CURSA'', :OLD.cod_cursa, ''DELETE'', NULL);
        END;
    ';

    -- Triggeri sync DETALII_CURSA_CENTRAL

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU INSERT DETALII_CURSA_CENTRAL
        CREATE OR REPLACE TRIGGER trg_ins_detalii_cursa_central
        AFTER INSERT ON DETALII_CURSA_CENTRAL
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "data_cursa": "'' || TO_CHAR(:NEW.data_cursa, ''YYYY-MM-DD'') ||
                            ''", "nota_sofer": "'' || :NEW.nota_sofer ||
                            ''", "nota_client": "'' || :NEW.nota_client || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''DETALII_CURSA'', :NEW.cod_cursa, ''INSERT'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU UPDATE DETALII_CURSA_CENTRAL
        CREATE OR REPLACE TRIGGER trg_upd_detalii_cursa_central
        AFTER UPDATE ON DETALII_CURSA_CENTRAL
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "data_cursa": "'' || TO_CHAR(:NEW.data_cursa, ''YYYY-MM-DD'') ||
                            ''", "nota_sofer": "'' || :NEW.nota_sofer ||
                            ''", "nota_client": "'' || :NEW.nota_client || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''DETALII_CURSA'', :NEW.cod_cursa, ''UPDATE'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU DELETE DETALII_CURSA_CENTRAL
        CREATE OR REPLACE TRIGGER trg_del_detalii_cursa_central
        AFTER DELETE ON DETALII_CURSA_CENTRAL
        FOR EACH ROW
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''DETALII_CURSA'', :OLD.cod_cursa, ''DELETE'', NULL);
        END;
    ';

    -- Triggeri sync LOCATII_CENTRAL

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU INSERT LOCATII_CENTRAL
        CREATE OR REPLACE TRIGGER trg_ins_locatii_central
        AFTER INSERT ON LOCATII_CENTRAL
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "localitate": "'' || :NEW.localitate ||
                            ''", "judet": "'' || :NEW.judet || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''LOCATII'', :NEW.cod_locatie, ''INSERT'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU UPDATE LOCATII_CENTRAL
        CREATE OR REPLACE TRIGGER trg_upd_locatii_central
        AFTER UPDATE ON LOCATII_CENTRAL
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "localitate": "'' || :NEW.localitate ||
                            ''", "judet": "'' || :NEW.judet || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''LOCATII'', :NEW.cod_locatie, ''UPDATE'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU DELETE LOCATII_CENTRAL
        CREATE OR REPLACE TRIGGER trg_del_locatii_central
        AFTER DELETE ON LOCATII_CENTRAL
        FOR EACH ROW
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''LOCATII'', :OLD.cod_locatie, ''DELETE'', NULL);
        END;
    ';

    BEGIN
        DBMS_SCHEDULER.drop_job(job_name => 'JOB_SYNC_DISTRIBUTIE', force => TRUE);
    EXCEPTION
        WHEN OTHERS THEN
            IF SQLCODE != -27475 THEN
                RAISE;
            END IF;
    END;

    EXECUTE IMMEDIATE '
        CREATE OR REPLACE PROCEDURE sp_sync_distributie IS
            v_nume VARCHAR2(100);
            v_prenume VARCHAR2(100);
            v_nr_telefon VARCHAR2(20);
            v_tip_angajat VARCHAR2(30);
            v_data_nastere DATE;
            v_data_angajare DATE;
            v_data_cursa DATE;
            v_salariu NUMBER;
            v_cod_masina VARCHAR2(100);
            v_nota_sofer NUMBER;
            v_nota_client NUMBER;
            v_localitate VARCHAR2(100);
            v_judet VARCHAR2(100);
            v_cod_sofer VARCHAR2(50);
            v_cod_client VARCHAR2(50);
            v_adresa_client VARCHAR2(200);
            v_destinatie VARCHAR2(200);
            v_cod_locatie VARCHAR2(50);
            v_nota NUMBER;
        BEGIN
            pkg_sync_ctx.start_sync;

            FOR job_rec IN (SELECT * FROM SYNC_JOBS ORDER BY created_at) LOOP
                IF job_rec.entitate = ''ANGAJAT_IDENTITY'' THEN
                    IF job_rec.operatie = ''UPDATE'' THEN
                        v_nume := JSON_VALUE(p_payload, ''$.nume'');
                        v_prenume := JSON_VALUE(p_payload, ''$.prenume'');

                        EXECUTE IMMEDIATE q''[
                            UPDATE ANGAJAT@OLTP_LINK
                            SET nume = :1,
                                prenume = :2,
                            WHERE cod_angajat = :3
                        ]'' USING v_nume, v_prenume, job_rec.cod;

                        EXECUTE IMMEDIATE q''[
                            UPDATE ANGAJAT_NORD@NORD_LINK
                            SET nume = :1,
                                prenume = :2,
                            WHERE cod_angajat = :3
                        ]'' USING v_nume, v_prenume, job_rec.cod;

                        EXECUTE IMMEDIATE q''[
                            UPDATE ANGAJAT_SUD@SUD_LINK
                            SET nume = :1,
                                prenume = :2,
                            WHERE cod_angajat = :3
                        ]'' USING v_nume, v_prenume, job_rec.cod;

                        EXECUTE IMMEDIATE q''[
                            UPDATE ANGAJAT_CENTRAL
                            SET nume = :1,
                                prenume = :2,
                            WHERE cod_angajat = :3
                        ]'' USING v_nume, v_prenume, job_rec.cod;

                    ELSIF job_rec.operatie = ''DELETE'' THEN
                        EXECUTE IMMEDIATE ''DELETE FROM ANGAJAT@OLTP_LINK WHERE cod_angajat = :1'' USING job_rec.cod;
                        EXECUTE IMMEDIATE ''DELETE FROM ANGAJAT_NORD@NORD_LINK WHERE cod_angajat = :1'' USING job_rec.cod;
                        EXECUTE IMMEDIATE ''DELETE FROM ANGAJAT_SUD@SUD_LINK WHERE cod_angajat = :1'' USING job_rec.cod;
                        EXECUTE IMMEDIATE ''DELETE FROM ANGAJAT_CENTRAL WHERE cod_angajat = :1'' USING job_rec.cod;
                        EXECUTE IMMEDIATE ''DELETE FROM ANGAJAT_HR@ARHIVA_LINK WHERE cod_angajat = :1'' USING job_rec.cod;
                    END IF;
                
                ELSIF job_rec.entitate = ''ANGAJAT_CENTRAL'' THEN
                    IF job_rec.operatie = ''INSERT'' THEN
                        v_nume := JSON_VALUE(p_payload, ''$.nume'');
                        v_prenume := JSON_VALUE(p_payload, ''$.prenume'');
                        v_nr_telefon := JSON_VALUE(p_payload, ''$.nr_telefon'');
                        v_tip_angajat := JSON_VALUE(p_payload, ''$.tip_angajat'');
                        v_data_nastere := TO_DATE(JSON_VALUE(job_rec.payload, ''$.data_nastere''), ''YYYY-MM-DD'');
                        v_data_angajare := TO_DATE(JSON_VALUE(job_rec.payload, ''$.data_angajare''), ''YYYY-MM-DD'');
                        v_salariu := JSON_VALUE(p_payload, ''$.salariu'');
                        v_cod_masina := JSON_VALUE(p_payload, ''$.cod_masina'');

                        EXECUTE IMMEDIATE q''[
                            INSERT INTO ANGAJAT@OLTP_LINK
                            (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                            VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)
                        ]'' USING p_cod, v_nume, v_prenume, v_nr_telefon, v_tip_angajat, v_data_nastere, v_data_angajare, v_salariu, v_cod_masina;
                        
                        EXECUTE IMMEDIATE q''[
                            INSERT INTO ANGAJAT_NORD@NORD_LINK
                            (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                            VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)
                        ]'' USING p_cod, v_nume, v_prenume, v_nr_telefon, v_tip_angajat, v_data_nastere, v_data_angajare, v_salariu, v_cod_masina;
                        
                        EXECUTE IMMEDIATE q''[
                            INSERT INTO ANGAJAT_SUD@SUD_LINK
                            (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                            VALUES (:1, :2, :3, :4, :5, :6, :7, :8, :9)
                        ]'' USING p_cod, v_nume, v_prenume, v_nr_telefon, v_tip_angajat, v_data_nastere, v_data_angajare, v_salariu, v_cod_masina;
                    
                    ELSIF job_rec.operatie = ''UPDATE'' THEN
                        v_nume := JSON_VALUE(p_payload, ''$.nume'');
                        v_prenume := JSON_VALUE(p_payload, ''$.prenume'');
                        v_nr_telefon := JSON_VALUE(p_payload, ''$.nr_telefon'');
                        v_tip_angajat := JSON_VALUE(p_payload, ''$.tip_angajat'');
                        v_data_nastere := TO_DATE(JSON_VALUE(job_rec.payload, ''$.data_nastere''), ''YYYY-MM-DD'');
                        v_data_angajare := TO_DATE(JSON_VALUE(job_rec.payload, ''$.data_angajare''), ''YYYY-MM-DD'');
                        v_salariu := JSON_VALUE(p_payload, ''$.salariu'');
                        v_cod_masina := JSON_VALUE(p_payload, ''$.cod_masina'');

                        EXECUTE IMMEDIATE q''[
                            UPDATE ANGAJAT@OLTP_LINK
                            SET nume = :1,
                                prenume = :2,
                                nr_telefon = :3,
                                tip_angajat = :4,
                                data_nastere = :5,
                                data_angajare = :6,
                                salariu = :7,
                                cod_masina = :8
                            WHERE cod_angajat = :9
                        ]'' USING v_nume, v_prenume, v_nr_telefon, v_tip_angajat, v_data_nastere, v_data_angajare, v_salariu, v_cod_masina, p_cod;
                        
                        EXECUTE IMMEDIATE q''[
                            UPDATE ANGAJAT_NORD@NORD_LINK
                            SET nume = :1,
                                prenume = :2,
                                nr_telefon = :3,
                                tip_angajat = :4,
                                data_nastere = :5,
                                data_angajare = :6,
                                salariu = :7,
                                cod_masina = :8
                            WHERE cod_angajat = :9
                        ]'' USING v_nume, v_prenume, v_nr_telefon, v_tip_angajat, v_data_nastere, v_data_angajare, v_salariu, v_cod_masina, p_cod;
                        
                        EXECUTE IMMEDIATE q''[
                            UPDATE ANGAJAT_SUD@SUD_LINK
                            SET nume = :1,
                                prenume = :2,
                                nr_telefon = :3,
                                tip_angajat = :4,
                                data_nastere = :5,
                                data_angajare = :6,
                                salariu = :7,
                                cod_masina = :8
                            WHERE cod_angajat = :9
                        ]'' USING v_nume, v_prenume, v_nr_telefon, v_tip_angajat, v_data_nastere, v_data_angajare, v_salariu, v_cod_masina, p_cod;

                    ELSIF job_rec.operatie = ''DELETE'' THEN
                        EXECUTE IMMEDIATE ''DELETE FROM ANGAJAT@OLTP_LINK WHERE cod_angajat = :1'' USING p_cod;
                        EXECUTE IMMEDIATE ''DELETE FROM ANGAJAT_NORD@NORD_LINK WHERE cod_angajat = :1'' USING p_cod;
                        EXECUTE IMMEDIATE ''DELETE FROM ANGAJAT_SUD@SUD_LINK WHERE cod_angajat = :1'' USING p_cod;
                    END IF;

                ELSIF job_rec.entitate = ''CLIENT'' THEN
                    IF job_rec.operatie = ''UPDATE'' THEN
                        v_nume := JSON_VALUE(p_payload, ''$.nume'');
                        v_prenume := JSON_VALUE(p_payload, ''$.prenume'');

                        EXECUTE IMMEDIATE q''[
                            UPDATE CLIENT@OLTP_LINK
                            SET nume = :1,
                                prenume = :2,
                            WHERE cod_client = :3
                        ]'' USING v_nume, v_prenume, job_rec.cod;

                        EXECUTE IMMEDIATE q''[
                            UPDATE CLIENT_NORD@NORD_LINK
                            SET nume = :1,
                                prenume = :2,
                            WHERE cod_client = :3
                        ]'' USING v_nume, v_prenume, job_rec.cod;

                        EXECUTE IMMEDIATE q''[
                            UPDATE CLIENT_SUD@SUD_LINK
                            SET nume = :1,
                                prenume = :2,
                            WHERE cod_client = :3
                        ]'' USING v_nume, v_prenume, job_rec.cod;

                        EXECUTE IMMEDIATE q''[
                            UPDATE CLIENT_CENTRAL
                            SET nume = :1,
                                prenume = :2,
                            WHERE cod_client = :3
                        ]'' USING v_nume, v_prenume, job_rec.cod;

                    ELSIF job_rec.operatie = ''DELETE'' THEN
                        EXECUTE IMMEDIATE ''DELETE FROM CLIENT@OLTP_LINK WHERE cod_client = :1'' USING job_rec.cod;
                        EXECUTE IMMEDIATE ''DELETE FROM CLIENT_NORD@NORD_LINK WHERE cod_client = :1'' USING job_rec.cod;
                        EXECUTE IMMEDIATE ''DELETE FROM CLIENT_SUD@SUD_LINK WHERE cod_client = :1'' USING job_rec.cod;
                        EXECUTE IMMEDIATE ''DELETE FROM CLIENT_CENTRAL WHERE cod_client = :1'' USING job_rec.cod;
                        EXECUTE IMMEDIATE ''DELETE FROM CLIENT_PROFIL@ARHIVA_LINK WHERE cod_client = :1'' USING job_rec.cod;
                    END IF;
                
                ELSIF job_rec.entitate = ''CURSA'' THEN
                    IF job_rec.operatie = ''INSERT'' THEN
                        v_cod_masina := JSON_VALUE(p_payload, ''$.cod_masina'');
                        v_cod_sofer := JSON_VALUE(p_payload, ''$.cod_sofer'');
                        v_cod_client := JSON_VALUE(p_payload, ''$.cod_client'');
                        v_adresa_client := JSON_VALUE(p_payload, ''$.adresa_client'');
                        v_destinatie := JSON_VALUE(p_payload, ''$.destinatie'');
                        v_cod_locatie := JSON_VALUE(p_payload, ''$.cod_locatie'');

                        EXECUTE IMMEDIATE q''[
                            INSERT INTO CURSA@OLTP_LINK 
                            (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                            VALUES (:1, :2, :3, :4, :5, :6, :7)
                        ]'' USING p_cod, v_cod_masina, v_cod_sofer, v_cod_client, v_adresa_client, v_destinatie, v_cod_locatie;
                        
                        EXECUTE IMMEDIATE q''[
                            INSERT INTO CURSA_NORD@NORD_LINK 
                            (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                            VALUES (:1, :2, :3, :4, :5, :6, :7)
                        ]'' USING p_cod, v_cod_masina, v_cod_sofer, v_cod_client, v_adresa_client, v_destinatie, v_cod_locatie;
                        
                        EXECUTE IMMEDIATE q''[
                            INSERT INTO CURSA_SUD@SUD_LINK 
                            (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                            VALUES (:1, :2, :3, :4, :5, :6, :7)
                        ]'' USING p_cod, v_cod_masina, v_cod_sofer, v_cod_client, v_adresa_client, v_destinatie, v_cod_locatie;
                    
                    ELSIF job_rec.operatie = ''UPDATE'' THEN
                        v_cod_masina := JSON_VALUE(p_payload, ''$.cod_masina'');
                        v_cod_sofer := JSON_VALUE(p_payload, ''$.cod_sofer'');
                        v_cod_client := JSON_VALUE(p_payload, ''$.cod_client'');
                        v_adresa_client := JSON_VALUE(p_payload, ''$.adresa_client'');
                        v_destinatie := JSON_VALUE(p_payload, ''$.destinatie'');
                        v_cod_locatie := JSON_VALUE(p_payload, ''$.cod_locatie'');

                        EXECUTE IMMEDIATE q''[
                            UPDATE CURSA@OLTP_LINK
                            SET cod_masina = :1,
                                cod_sofer = :2,
                                cod_client = :3,
                                adresa_client = :4,
                                destinatie = :5,
                                cod_locatie = :6
                            WHERE cod_cursa = :7
                        ]'' USING v_cod_masina, v_cod_sofer, v_cod_client, v_adresa_client, v_destinatie, v_cod_locatie, p_cod;
                        
                        EXECUTE IMMEDIATE q''[
                            UPDATE CURSA_NORD@NORD_LINK
                            SET cod_masina = :1,
                                cod_sofer = :2,
                                cod_client = :3,
                                adresa_client = :4,
                                destinatie = :5,
                                cod_locatie = :6
                            WHERE cod_cursa = :7
                        ]'' USING v_cod_masina, v_cod_sofer, v_cod_client, v_adresa_client, v_destinatie, v_cod_locatie, p_cod;
                        
                        EXECUTE IMMEDIATE q''[
                            UPDATE CURSA_SUD@SUD_LINK
                            SET cod_masina = :1,
                                cod_sofer = :2,
                                cod_client = :3,
                                adresa_client = :4,
                                destinatie = :5,
                                cod_locatie = :6
                            WHERE cod_cursa = :7
                        ]'' USING v_cod_masina, v_cod_sofer, v_cod_client, v_adresa_client, v_destinatie, v_cod_locatie, p_cod;

                    ELSIF job_rec.operatie = ''DELETE'' THEN
                        EXECUTE IMMEDIATE ''DELETE FROM CURSA@OLTP_LINK WHERE cod_cursa = :1'' USING p_cod;
                        EXECUTE IMMEDIATE ''DELETE FROM CURSA_NORD@NORD_LINK WHERE cod_cursa = :1'' USING p_cod;
                        EXECUTE IMMEDIATE ''DELETE FROM CURSA_SUD@SUD_LINK WHERE cod_cursa = :1'' USING p_cod;
                    END IF;
                
                ELSIF p_entitate = ''DETALII_CURSA'' THEN
                    IF p_operatie = ''INSERT'' OR p_operatie = ''UPDATE'' THEN
                        v_data_cursa := TO_DATE(JSON_VALUE(p_payload, ''$.data_cursa''), ''YYYY-MM-DD'');
                        v_nota_sofer := TO_NUMBER(JSON_VALUE(p_payload, ''$.nota_sofer''));
                        v_nota_client := TO_NUMBER(JSON_VALUE(p_payload, ''$.nota_client''));
                        
                        IF p_operatie = ''INSERT'' THEN
                            -- Insert into all databases
                            EXECUTE IMMEDIATE q''[
                                INSERT INTO DETALII_CURSA@OLTP_LINK 
                                (cod_cursa, data_cursa, nota_sofer, nota_client)
                                VALUES (:1, :2, :3, :4)
                            ]'' USING p_cod, v_data_cursa, v_nota_sofer, v_nota_client;
                            
                            EXECUTE IMMEDIATE q''[
                                INSERT INTO DETALII_CURSA_NORD@NORD_LINK 
                                (cod_cursa, data_cursa, nota_sofer, nota_client)
                                VALUES (:1, :2, :3, :4)
                            ]'' USING p_cod, v_data_cursa, v_nota_sofer, v_nota_client;
                            
                            EXECUTE IMMEDIATE q''[
                                INSERT INTO DETALII_CURSA_SUD@SUD_LINK 
                                (cod_cursa, data_cursa, nota_sofer, nota_client)
                                VALUES (:1, :2, :3, :4)
                            ]'' USING p_cod, v_data_cursa, v_nota_sofer, v_nota_client;
                            
                        ELSIF p_operatie = ''UPDATE'' THEN
                            -- Update across all databases
                            EXECUTE IMMEDIATE q''[
                                UPDATE DETALII_CURSA@OLTP_LINK
                                SET data_cursa = :1,
                                    nota_sofer = :2,
                                    nota_client = :3
                                WHERE cod_cursa = :4
                            ]'' USING v_data_cursa, v_nota_sofer, v_nota_client, p_cod;
                            
                            EXECUTE IMMEDIATE q''[
                                UPDATE DETALII_CURSA_NORD@NORD_LINK
                                SET data_cursa = :1,
                                    nota_sofer = :2,
                                    nota_client = :3
                                WHERE cod_cursa = :4
                            ]'' USING v_data_cursa, v_nota_sofer, v_nota_client, p_cod;
                            
                            EXECUTE IMMEDIATE q''[
                                UPDATE DETALII_CURSA_SUD@SUD_LINK
                                SET data_cursa = :1,
                                    nota_sofer = :2,
                                    nota_client = :3
                                WHERE cod_cursa = :4
                            ]'' USING v_data_cursa, v_nota_sofer, v_nota_client, p_cod;
                        END IF;
                        
                    ELSIF p_operatie = ''DELETE'' THEN
                        EXECUTE IMMEDIATE ''DELETE FROM DETALII_CURSA@OLTP_LINK WHERE cod_cursa = :1'' USING p_cod;
                        EXECUTE IMMEDIATE ''DELETE FROM DETALII_CURSA_NORD@NORD_LINK WHERE cod_cursa = :1'' USING p_cod;
                        EXECUTE IMMEDIATE ''DELETE FROM DETALII_CURSA_SUD@SUD_LINK WHERE cod_cursa = :1'' USING p_cod;
                    END IF;
                    
                ELSIF p_entitate = ''LOCATII'' THEN
                    IF p_operatie = ''INSERT'' OR p_operatie = ''UPDATE'' THEN
                        v_localitate := JSON_VALUE(p_payload, ''$.localitate'');
                        v_judet := JSON_VALUE(p_payload, ''$.judet'');
                        
                        IF p_operatie = ''INSERT'' THEN
                            -- Insert into all databases
                            EXECUTE IMMEDIATE q''[
                                INSERT INTO LOCATII@OLTP_LINK 
                                (cod_locatie, localitate, judet)
                                VALUES (:1, :2, :3)
                            ]'' USING p_cod, v_localitate, v_judet;
                            
                            EXECUTE IMMEDIATE q''[
                                INSERT INTO LOCATII_NORD@NORD_LINK 
                                (cod_locatie, localitate, judet)
                                VALUES (:1, :2, :3)
                            ]'' USING p_cod, v_localitate, v_judet;
                            
                            EXECUTE IMMEDIATE q''[
                                INSERT INTO LOCATII_SUD@SUD_LINK 
                                (cod_locatie, localitate, judet)
                                VALUES (:1, :2, :3)
                            ]'' USING p_cod, v_localitate, v_judet;
                            
                        ELSIF p_operatie = ''UPDATE'' THEN
                            -- Update across all databases
                            EXECUTE IMMEDIATE q''[
                                UPDATE LOCATII@OLTP_LINK
                                SET localitate = :1,
                                    judet = :2
                                WHERE cod_locatie = :3
                            ]'' USING v_localitate, v_judet, p_cod;
                            
                            EXECUTE IMMEDIATE q''[
                                UPDATE LOCATII_NORD@NORD_LINK
                                SET localitate = :1,
                                    judet = :2
                                WHERE cod_locatie = :3
                            ]'' USING v_localitate, v_judet, p_cod;
                            
                            EXECUTE IMMEDIATE q''[
                                UPDATE LOCATII_SUD@SUD_LINK
                                SET localitate = :1,
                                    judet = :2
                                WHERE cod_locatie = :3
                            ]'' USING v_localitate, v_judet, p_cod;
                        END IF;
                        
                    ELSIF p_operatie = ''DELETE'' THEN
                        EXECUTE IMMEDIATE ''DELETE FROM LOCATII@OLTP_LINK WHERE cod_locatie = :1'' USING p_cod;
                        EXECUTE IMMEDIATE ''DELETE FROM LOCATII_NORD@NORD_LINK WHERE cod_locatie = :1'' USING p_cod;
                        EXECUTE IMMEDIATE ''DELETE FROM LOCATII_SUD@SUD_LINK WHERE cod_locatie = :1'' USING p_cod;
                    END IF;
                END IF;

                DELETE FROM SYNC_JOBS WHERE id = job_rec.id;
            END LOOP;

            pkg_sync_ctx.end_sync;
        END;
    ';

    BEGIN
        DBMS_SCHEDULER.create_job (
            job_name        => 'JOB_SYNC_DISTRIBUTIE',
            job_type        => 'PLSQL_BLOCK',
            job_action      => 'BEGIN sp_sync_distributie; END;',
            start_date      => SYSTIMESTAMP,
            repeat_interval => 'FREQ=SECONDLY;INTERVAL=30',
            enabled         => TRUE
        );
    END;
    
END;