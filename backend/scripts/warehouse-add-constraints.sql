DECLARE
    v_constraint_exists NUMBER;
BEGIN
    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'DIM_CLIENT'
      AND CONSTRAINT_NAME = 'NOTA_CLIENT_CHECK';

    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DIM_CLIENT
                          ADD CONSTRAINT Nota_Client_CHECK
                          CHECK (nota_client BETWEEN 1 AND 10)';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'DIM_ANGAJAT'
      AND CONSTRAINT_NAME = 'SALARIU_CHECK';
    
    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DIM_ANGAJAT
                          ADD CONSTRAINT SALARIU_CHECK
                          CHECK (Salariu > 0)';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'DIM_MASINA'
      AND CONSTRAINT_NAME = 'DATA_REVIZIE_CHECK';
    
    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DIM_MASINA
                          ADD CONSTRAINT DATA_REVIZIE_CHECK
                          CHECK (Data_Revizie_Urm >= Data_Achizitionare)';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'DIM_TIMP'
      AND CONSTRAINT_NAME = 'ANUL_CHECK';
    
    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DIM_TIMP
                          ADD CONSTRAINT ANUL_CHECK
                          CHECK (Anul > 0)';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'DIM_TIMP'
      AND CONSTRAINT_NAME = 'LUNA_CHECK';
    
    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DIM_TIMP
                          ADD CONSTRAINT LUNA_CHECK
                          CHECK (Luna BETWEEN 1 AND 12)';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'DIM_TIMP'
      AND CONSTRAINT_NAME = 'TRIMESTRU_CHECK';
    
    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DIM_TIMP
                          ADD CONSTRAINT TRIMESTRU_CHECK
                          CHECK (Trimestru BETWEEN 1 AND 4)';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'DIM_TIMP'
      AND CONSTRAINT_NAME = 'ZIUA_CHECK';
    
    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DIM_TIMP
                          ADD CONSTRAINT ZIUA_CHECK
                          CHECK (Ziua BETWEEN 1 AND 31)';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'DIM_TIMP'
      AND CONSTRAINT_NAME = 'ZIUA_SAPTAMANII_CHECK';
    
    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DIM_TIMP
                          ADD CONSTRAINT ZIUA_SAPTAMANII_CHECK
                          CHECK (Ziua_Saptamanii BETWEEN 1 AND 7)';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'DIM_TIMP'
      AND CONSTRAINT_NAME = 'ESTE_WEEKEND_CHECK';
    
    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DIM_TIMP
                          ADD CONSTRAINT ESTE_WEEKEND_CHECK
                          CHECK (Este_Weekend IN (0, 1))';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
      FROM USER_CONSTRAINTS
      WHERE TABLE_NAME = 'DIM_FACTURA'
        AND CONSTRAINT_NAME = 'PRET_CHECK';
      
      IF v_constraint_exists = 0 THEN
          EXECUTE IMMEDIATE 'ALTER TABLE DIM_FACTURA
                            ADD CONSTRAINT PRET_CHECK
                            CHECK (Pret >= 0)';
      END IF;

    EXECUTE IMMEDIATE 'ALTER TABLE DIM_MASINA MODIFY (Data_Revizie_Urm NOT NULL)';
    EXECUTE IMMEDIATE 'ALTER TABLE DIM_MASINA MODIFY (Data_Achizitionare NOT NULL)';

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'F_CURSA'
      AND CONSTRAINT_NAME = 'NOTA_SOFER_CHECK';

    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE F_CURSA
                          ADD CONSTRAINT Nota_Sofer_CHECK
                          CHECK (nota_sofer BETWEEN 1 AND 10)';
    END IF;

    SELECT COUNT(*) INTO v_constraint_exists
    FROM USER_CONSTRAINTS
    WHERE TABLE_NAME = 'F_CURSA'
      AND CONSTRAINT_NAME = 'NOTA_CLIENT_FCURSA_CHECK';

    IF v_constraint_exists = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE F_CURSA
                          ADD CONSTRAINT NOTA_CLIENT_FCURSA_CHECK
                          CHECK (nota_client BETWEEN 1 AND 10)';
    END IF;
END;  