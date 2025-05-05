-- 6. Asigurarea tuturor constrângerilor de integritate folosite în model (atât la nivel local, cât și la nivel global)

DECLARE
    v_count NUMBER;
BEGIN
    -- UNIQUE nr_telefon pentru ANGAJAT
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'UNIQUE_TEL_ANGAJAT';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT ADD CONSTRAINT unique_tel_angajat UNIQUE (nr_telefon)';
    END IF;

    -- UNIQUE nr_telefon pentru CLIENT
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'UNIQUE_TEL_CLIENT';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE CLIENT ADD CONSTRAINT unique_tel_client UNIQUE (nr_telefon)';
    END IF;

    -- UNIQUE localitate pentru LOCATII
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'UNIQUE_LOCALITATI';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE LOCATII ADD CONSTRAINT unique_localitati UNIQUE (localitate)';
    END IF;

    -- CHECK salariu > 0
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'CHK_SALARIU';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT ADD CONSTRAINT chk_salariu CHECK (salariu > 0)';
    END IF;

    -- CHECK nota între 1 și 10 pentru CLIENT
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'CHK_NOTA_CLIENT';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE CLIENT ADD CONSTRAINT chk_nota_client CHECK (nota BETWEEN 1 AND 10)';
    END IF;

    -- CHECK note între 1 și 10 pentru DETALII_CURSA
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'CHK_NOTE_VALID';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DETALII_CURSA ADD CONSTRAINT chk_note_valid CHECK (nota_sofer BETWEEN 1 AND 10 AND nota_client BETWEEN 1 AND 10)';
    END IF;

    COMMIT;
END;