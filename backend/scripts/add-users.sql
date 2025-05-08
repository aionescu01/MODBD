-- Crearea utilizatorilor și atribuirea unor privilegii de bază

DECLARE
    v_user_exists NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_user_exists
    FROM ALL_USERS
    WHERE USERNAME = 'ADMINISTRATOR';

    IF v_user_exists = 0 THEN
        EXECUTE IMMEDIATE 'CREATE USER administrator IDENTIFIED BY admin_password';
        EXECUTE IMMEDIATE 'GRANT CONNECT, RESOURCE, DBA TO administrator';
    END IF;

    SELECT COUNT(*) INTO v_user_exists
    FROM ALL_USERS
    WHERE USERNAME = 'DISPECER';

    IF v_user_exists = 0 THEN
        EXECUTE IMMEDIATE 'CREATE USER dispecer IDENTIFIED BY dispecer_password';
        EXECUTE IMMEDIATE 'GRANT CONNECT TO dispecer';
    END IF;

    SELECT COUNT(*) INTO v_user_exists
    FROM ALL_USERS
    WHERE USERNAME = 'SOFER';

    IF v_user_exists = 0 THEN
        EXECUTE IMMEDIATE 'CREATE USER sofer IDENTIFIED BY sofer_password';
        EXECUTE IMMEDIATE 'GRANT CONNECT TO sofer';
    END IF;

    SELECT COUNT(*) INTO v_user_exists
    FROM ALL_USERS
    WHERE USERNAME = 'CLIENT';

    IF v_user_exists = 0 THEN
        EXECUTE IMMEDIATE 'CREATE USER client IDENTIFIED BY client_password';
        EXECUTE IMMEDIATE 'GRANT CONNECT TO client';
    END IF;

    COMMIT;
END;