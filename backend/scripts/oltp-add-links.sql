-- Adăugare link-uri către celelalte pdb-uri, daca nu exista

DECLARE
    link_exists NUMBER;
BEGIN
    -- Verifică dacă link-ul 'nord_link' există deja
    SELECT COUNT(*) INTO link_exists
    FROM all_db_links
    WHERE db_link = 'NORD_LINK';

    IF link_exists = 0 THEN
        -- Creează link-ul 'nord_link' dacă nu există
        EXECUTE IMMEDIATE 'CREATE DATABASE LINK nord_link CONNECT TO admin IDENTIFIED BY admin USING ''nord''';
    END IF;

    -- Verifică dacă link-ul 'sud_link' există deja
    SELECT COUNT(*) INTO link_exists
    FROM all_db_links
    WHERE db_link = 'SUD_LINK';

    IF link_exists = 0 THEN
        -- Creează link-ul 'sud_link' dacă nu există
        EXECUTE IMMEDIATE 'CREATE DATABASE LINK sud_link CONNECT TO admin IDENTIFIED BY admin USING ''sud''';
    END IF;

    -- Verifică dacă link-ul 'central_link' există deja
    SELECT COUNT(*) INTO link_exists
    FROM all_db_links
    WHERE db_link = 'CENTRAL_LINK';

    IF link_exists = 0 THEN
        -- Creează link-ul 'central_link' dacă nu există
        EXECUTE IMMEDIATE 'CREATE DATABASE LINK central_link CONNECT TO admin IDENTIFIED BY admin USING ''central''';
    END IF;

    -- Verifică dacă link-ul 'arhiva_link' există deja
    SELECT COUNT(*) INTO link_exists
    FROM all_db_links
    WHERE db_link = 'ARHIVA_LINK';

    IF link_exists = 0 THEN
        -- Creează link-ul 'arhiva_link' dacă nu există
        EXECUTE IMMEDIATE 'CREATE DATABASE LINK arhiva_link CONNECT TO admin IDENTIFIED BY admin USING ''arhiva''';
    END IF;

    COMMIT;
END;
