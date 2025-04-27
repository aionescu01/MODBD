-- Crearea utilizatorilor pentru warehouse și atribuirea unor privilegii de bază

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
    WHERE USERNAME = 'ANALIST';

    IF v_user_exists = 0 THEN
        EXECUTE IMMEDIATE 'CREATE USER analist IDENTIFIED BY analist_password';
        EXECUTE IMMEDIATE 'GRANT CONNECT TO analist';
    END IF;
END;
