-- 6. Asigurarea tuturor constrângerilor de integritate folosite în model (atât la nivel local, cât și la nivel global)

-- Adăugare constrângeri de tip CHECK și UNIQUE pe baza de date central

DECLARE
    v_count NUMBER;
BEGIN
    -- UNIQUE: nr_telefon în ANGAJAT_CENTRAL
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'UNIQUE_TEL_ANGAJAT_CENTRAL';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT_CENTRAL ADD CONSTRAINT unique_tel_angajat_central UNIQUE (nr_telefon)';
    END IF;

    -- UNIQUE: localitate în LOCATII_CENTRAL
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'UNIQUE_LOCALITATI_CENTRAL';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE LOCATII_CENTRAL ADD CONSTRAINT unique_localitati_central UNIQUE (localitate)';
    END IF;

    -- CHECK: salariu > 0 în ANGAJAT_CENTRAL
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'CHK_SALARIU_CENTRAL';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT_CENTRAL ADD CONSTRAINT chk_salariu_central CHECK (salariu > 0)';
    END IF;

    -- CHECK: note valide în DETALII_CURSA_CENTRAL
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'CHK_NOTE_VALID_CENTRAL';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DETALII_CURSA_CENTRAL ADD CONSTRAINT chk_note_valid_central CHECK (nota_sofer BETWEEN 1 AND 10 AND nota_client BETWEEN 1 AND 10)';
    END IF;

    -- Constrângeri globale de unicitate pe LOCATII

    EXECUTE IMMEDIATE '
        CREATE OR REPLACE PROCEDURE check_global_unique_locatie(
            p_localitate VARCHAR2,
            p_cod_locatie NUMBER
        ) IS
            v_count_nord NUMBER := 0;
            v_count_sud NUMBER := 0;
        BEGIN
            SELECT COUNT(*) INTO v_count_nord
            FROM LOCATII_NORD@nord_link
            WHERE localitate = p_localitate AND cod_locatie <> p_cod_locatie;
            
            IF v_count_nord > 0 THEN
                RAISE_APPLICATION_ERROR(-20102, ''Locatia exista deja in NORD'');
            END IF;
            
            SELECT COUNT(*) INTO v_count_sud
            FROM LOCATII_SUD@sud_link
            WHERE localitate = p_localitate AND cod_locatie <> p_cod_locatie;
            
            IF v_count_sud > 0 THEN
                RAISE_APPLICATION_ERROR(-20103, ''Locatia exista deja in SUD'');
            END IF;
        END;
    ';

    -- Creare trigger INSERT/UPDATE

    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_check_unique_locatie_central
            BEFORE INSERT OR UPDATE ON LOCATII_CENTRAL
            FOR EACH ROW
        BEGIN
            check_global_unique_locatie(:NEW.localitate, :NEW.cod_locatie);
        END;
    ';

    COMMIT;
END;