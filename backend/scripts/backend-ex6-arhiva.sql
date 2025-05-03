-- 6. Asigurarea tuturor constrângerilor de integritate folosite în model (atât la nivel local, cât și la nivel global)

-- Adăugare constrângeri de tip CHECK și UNIQUE pe baza de date arhiva

BEGIN
  EXECUTE IMMEDIATE 'ALTER TABLE ANGAJAT_HR ADD CONSTRAINT chk_salariu CHECK (salariu > 0)';
  EXECUTE IMMEDIATE 'ALTER TABLE CLIENT_PROFIL ADD CONSTRAINT chk_nota_client CHECK (nota BETWEEN 1 AND 10)';
  
  COMMIT;
END;