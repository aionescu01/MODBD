DECLARE
    v_constraint_exists NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'MESAJ'
      AND CONSTRAINT_NAME = 'MESSAGE_TYPE_CHECK';

    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE MESAJ
                           ADD CONSTRAINT MESSAGE_TYPE_CHECK
                           CHECK (MESSAGE_TYPE IN (''E'', ''W'', ''I''))';
    END IF;

    COMMIT;
END;