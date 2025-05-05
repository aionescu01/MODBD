-- 6. Asigurarea tuturor constrângerilor de integritate folosite în model (atât la nivel local, cât și la nivel global)

-- Adăugare constrângeri de tip CHECK și UNIQUE pe baza de date sud

DECLARE
    v_count NUMBER;
BEGIN
    -- UNIQUE: nr_telefon în ANGAJAT_SUD
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'UNIQUE_TEL_ANGAJAT_SUD';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT_SUD ADD CONSTRAINT unique_tel_angajat_sud UNIQUE (nr_telefon)';
    END IF;

    -- UNIQUE: nr_telefon în ANGAJAT_CONTACT
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'UNIQUE_TEL_ANGAJAT_CONTACT';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT_CONTACT ADD CONSTRAINT unique_tel_angajat_contact UNIQUE (nr_telefon)';
    END IF;

    -- UNIQUE: nr_telefon în CLIENT_CONTACT
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'UNIQUE_TEL_CLIENT';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE CLIENT_CONTACT ADD CONSTRAINT unique_tel_client UNIQUE (nr_telefon)';
    END IF;

    -- UNIQUE: localitate în LOCATII_SUD
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'UNIQUE_LOCALITATI_SUD';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE LOCATII_SUD ADD CONSTRAINT unique_localitati_sud UNIQUE (localitate)';
    END IF;

    -- CHECK: salariu > 0 în ANGAJAT_SUD
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'CHK_SALARIU_SUD';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT_SUD ADD CONSTRAINT chk_salariu_sud CHECK (salariu > 0)';
    END IF;

    -- CHECK: note valide în DETALII_CURSA_SUD
    SELECT COUNT(*) INTO v_count FROM USER_CONSTRAINTS WHERE CONSTRAINT_NAME = 'CHK_NOTE_VALID_SUD';
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE DETALII_CURSA_SUD ADD CONSTRAINT chk_note_valid_sud CHECK (nota_sofer BETWEEN 1 AND 10 AND nota_client BETWEEN 1 AND 10)';
    END IF;

    -- Constrângeri globale de unicitate pe LOCATII

    EXECUTE IMMEDIATE '
        CREATE OR REPLACE PROCEDURE check_global_unique_locatie(
            p_localitate VARCHAR2
        ) IS
            v_count_nord NUMBER := 0;
            v_count_central NUMBER := 0;
        BEGIN
            SELECT COUNT(*) INTO v_count_nord
            FROM LOCATII_NORD@nord_link
            WHERE localitate = p_localitate;
            
            IF v_count_nord > 0 THEN
                RAISE_APPLICATION_ERROR(-20102, ''Locatia exista deja in NORD'');
            END IF;
            
            SELECT COUNT(*) INTO v_count_central
            FROM LOCATII_CENTRAL@central_link
            WHERE localitate = p_localitate;
            
            IF v_count_central > 0 THEN
                RAISE_APPLICATION_ERROR(-20103, ''Locatia exista deja in CENTRAL'');
            END IF;
        END;
    ';

    -- Creare trigger INSERT/UPDATE

    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_check_unique_locatie_sud
            BEFORE INSERT OR UPDATE ON LOCATII_SUD
            FOR EACH ROW
        BEGIN
            check_global_unique_locatie(:NEW.localitate);
        END;
    ';

    COMMIT;
END;