-- 6. Asigurarea tuturor constrângerilor de integritate folosite în model (atât la nivel local, cât și la nivel global)

BEGIN
    -- Adăugare constrângeri de tip CHECK și UNIQUE pe baza de date OLTP

    EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT ADD CONSTRAINT unique_tel_angajat UNIQUE (nr_telefon)';
    EXECUTE IMMEDIATE 'ALTER TABLE CLIENT ADD CONSTRAINT unique_tel_client UNIQUE (nr_telefon)';
    EXECUTE IMMEDIATE 'ALTER TABLE LOCATII ADD CONSTRAINT unique_localitati UNIQUE (localitate)';
    
    EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT ADD CONSTRAINT chk_salariu CHECK (salariu > 0)';
    EXECUTE IMMEDIATE 'ALTER TABLE CLIENT ADD CONSTRAINT chk_nota_client CHECK (nota BETWEEN 1 AND 10)';
    EXECUTE IMMEDIATE 'ALTER TABLE DETALII_CURSA ADD CONSTRAINT chk_note_valid CHECK (nota_sofer BETWEEN 1 AND 10 AND nota_client BETWEEN 1 AND 10)';

    COMMIT;
END;