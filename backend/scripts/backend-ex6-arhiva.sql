-- 6. Asigurarea tuturor constrângerilor de integritate folosite în model (atât la nivel local, cât și la nivel global)

-- Adăugare constrângeri de tip CHECK și UNIQUE pe baza de date arhiva

DECLARE
    v_count NUMBER;
BEGIN
    -- Verificare și adăugare chk_salariu pe ANGAJAT_HR
    SELECT COUNT(*) INTO v_count 
    FROM USER_CONSTRAINTS 
    WHERE TABLE_NAME = 'ANGAJAT_HR' AND CONSTRAINT_NAME = 'CHK_SALARIU';
    
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT_HR ADD CONSTRAINT chk_salariu CHECK (salariu > 0)';
    END IF;

    -- Verificare și adăugare chk_nota_client pe CLIENT_PROFIL
    SELECT COUNT(*) INTO v_count 
    FROM USER_CONSTRAINTS 
    WHERE TABLE_NAME = 'CLIENT_PROFIL' AND CONSTRAINT_NAME = 'CHK_NOTA_CLIENT';
    
    IF v_count = 0 THEN
        EXECUTE IMMEDIATE 'ALTER TABLE CLIENT_PROFIL ADD CONSTRAINT chk_nota_client CHECK (nota BETWEEN 1 AND 10)';
    END IF;
  
  COMMIT;
END;