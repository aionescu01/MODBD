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
            operatie   VARCHAR2(10), -- UPDATE / DELETE
            payload    CLOB,
            created_at DATE DEFAULT SYSDATE
        )
    ';

    EXECUTE IMMEDIATE'
        CREATE OR REPLACE PACKAGE pkg_sync_ctx AS
            PROCEDURE start_sync;
            PROCEDURE end_sync;
            FUNCTION is_sync RETURN BOOLEAN;

            PROCEDURE disable_all_triggers;
            PROCEDURE enable_all_triggers;
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

            PROCEDURE disable_all_triggers IS
            BEGIN
                EXECUTE IMMEDIATE ''ALTER TRIGGER trg_upd_angajat DISABLE'';
                EXECUTE IMMEDIATE ''ALTER TRIGGER trg_upd_client DISABLE'';
                
                EXECUTE IMMEDIATE ''ALTER TRIGGER trg_del_angajat DISABLE'';
                EXECUTE IMMEDIATE ''ALTER TRIGGER trg_del_client DISABLE'';
            END;

            PROCEDURE enable_all_triggers IS
            BEGIN
                EXECUTE IMMEDIATE ''ALTER TRIGGER trg_upd_angajat ENABLE'';
                EXECUTE IMMEDIATE ''ALTER TRIGGER trg_upd_client ENABLE'';

                EXECUTE IMMEDIATE ''ALTER TRIGGER trg_del_angajat ENABLE'';
                EXECUTE IMMEDIATE ''ALTER TRIGGER trg_del_client ENABLE'';
            END;
        END;
    ';

    EXECUTE IMMEDIATE '
        BEGIN
            EXECUTE IMMEDIATE ''CREATE CONTEXT sync_ctx USING pkg_sync_ctx'';
        EXCEPTION
            WHEN OTHERS THEN
                IF SQLCODE = -955 THEN
                    NULL;
                ELSE
                    RAISE;
                END IF;
        END;
    ';

    -- Triggeri sync ANGAJAT_HR

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU UPDATE ANGAJAT_HR
        CREATE OR REPLACE TRIGGER trg_upd_angajat
        AFTER UPDATE ON ANGAJAT_HR
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "data_nastere": "'' || TO_CHAR(:NEW.data_nastere, ''YYYY-MM-DD'') ||
                            ''", "data_angajare": "'' || TO_CHAR(:NEW.data_angajare, ''YYYY-MM-DD'') ||
                            ''", "salariu": "'' || :NEW.salariu ||
                            ''", "cod_masina": "'' || :NEW.cod_masina || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''ANGAJAT'', :NEW.cod_angajat, ''UPDATE'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU DELETE ANGAJAT_HR
        CREATE OR REPLACE TRIGGER trg_del_angajat
        AFTER DELETE ON ANGAJAT_HR
        FOR EACH ROW
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''ANGAJAT'', :OLD.cod_angajat, ''DELETE'', NULL);
        END;
    ';

    -- Triggeri sync CLIENT_PROFIL

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU UPDATE CLIENT_PROFIL
        CREATE OR REPLACE TRIGGER trg_upd_client
        AFTER UPDATE ON CLIENT_PROFIL
        FOR EACH ROW
        DECLARE
            v_payload CLOB;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            v_payload := ''{ "data_nastere": "'' || TO_CHAR(:NEW.data_nastere, ''YYYY-MM-DD'') ||
                            ''", "nota": "'' || :NEW.nota || ''" }'';

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''CLIENT'', :NEW.cod_client, ''UPDATE'', v_payload);
        END;
    ';

    EXECUTE IMMEDIATE '
        -- TRIGGER PENTRU DELETE CLIENT_PROFIL
        CREATE OR REPLACE TRIGGER trg_del_client
        AFTER DELETE ON CLIENT_PROFIL
        FOR EACH ROW
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            INSERT INTO SYNC_JOBS (entitate, cod, operatie, payload)
            VALUES (''CLIENT'', :OLD.cod_client, ''DELETE'', NULL);
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
            v_data_nastere DATE;
            v_data_angajare DATE;
            v_salariu NUMBER;
            v_cod_masina VARCHAR2(100);
            v_nota NUMBER;
        BEGIN
            IF pkg_sync_ctx.is_sync THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;

            pkg_sync_ctx.set_initiator@OLTP_LINK(''ARHIVA'');

            BEGIN
                pkg_sync_ctx.disable_all_triggers;
                pkg_sync_ctx.disable_all_triggers@CENTRAL_LINK;
                pkg_sync_ctx.disable_all_triggers@NORD_LINK;
                pkg_sync_ctx.disable_all_triggers@SUD_LINK;
            END;

            FOR job_rec IN (SELECT * FROM SYNC_JOBS ORDER BY created_at) LOOP
                IF job_rec.entitate = ''ANGAJAT'' THEN
                    IF job_rec.operatie = ''UPDATE'' THEN

                        v_data_nastere := TO_DATE(JSON_VALUE(job_rec.payload, ''$.data_nastere''), ''YYYY-MM-DD'');
                        v_data_angajare := TO_DATE(JSON_VALUE(job_rec.payload, ''$.data_angajare''), ''YYYY-MM-DD'');
                        v_salariu := TO_NUMBER(JSON_VALUE(job_rec.payload, ''$.salariu''));
                        v_cod_masina := JSON_VALUE(job_rec.payload, ''$.cod_masina'');

                        EXECUTE IMMEDIATE q''[
                            UPDATE ANGAJAT@OLTP_LINK
                            SET data_nastere = :1,
                                data_angajare = :2,
                                salariu = :3,
                                cod_masina = :4
                            WHERE cod_angajat = :5
                        ]'' USING v_data_nastere, v_data_angajare, v_salariu, v_cod_masina, job_rec.cod;

                    ELSIF job_rec.operatie = ''DELETE'' THEN
                        
                        EXECUTE IMMEDIATE ''DELETE FROM ANGAJAT@OLTP_LINK WHERE cod_angajat = :1'' USING job_rec.cod;
                    
                    END IF;

                ELSIF job_rec.entitate = ''CLIENT'' THEN
                    IF job_rec.operatie = ''UPDATE'' THEN
                        
                        v_data_nastere := TO_DATE(JSON_VALUE(job_rec.payload, ''$.data_nastere''), ''YYYY-MM-DD'');
                        v_nota := TO_NUMBER(JSON_VALUE(job_rec.payload, ''$.nota''));

                        EXECUTE IMMEDIATE q''[
                            UPDATE CLIENT@OLTP_LINK
                            SET data_nastere = :1,
                                nota = :2
                            WHERE cod_client = :3
                        ]'' USING v_data_nastere, v_nota, job_rec.cod;

                    ELSIF job_rec.operatie = ''DELETE'' THEN
                        
                        EXECUTE IMMEDIATE ''DELETE FROM CLIENT@OLTP_LINK WHERE cod_client = :1'' USING job_rec.cod;
                    
                    END IF;
                END IF;
                
            END LOOP;

            DELETE FROM SYNC_JOBS;

            pkg_sync_ctx.end_sync;

            pkg_sync_ctx.set_initiator@OLTP_LINK('''');

            BEGIN
                pkg_sync_ctx.enable_all_triggers;
                pkg_sync_ctx.enable_all_triggers@CENTRAL_LINK;
                pkg_sync_ctx.enable_all_triggers@NORD_LINK;
                pkg_sync_ctx.enable_all_triggers@SUD_LINK;
            END;
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