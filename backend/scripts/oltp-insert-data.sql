BEGIN

  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Popescu', 'Ion', '0712345678', 'Dl.', TO_DATE('1985-06-15', 'YYYY-MM-DD'), 9.5);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Ionescu', 'Maria', '0712345679', 'Dna.', TO_DATE('1990-03-22', 'YYYY-MM-DD'), 8.7);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Georgescu', 'Andrei', '0723456789', 'Dl.', TO_DATE('1982-07-30', 'YYYY-MM-DD'), 7.3);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Radu', 'Elena', '0734567890', 'Dna.', TO_DATE('1975-12-10', 'YYYY-MM-DD'), 6.8);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Vasilescu', 'Mihai', '0745678901', 'Dl.', TO_DATE('1995-01-25', 'YYYY-MM-DD'), 8.9);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Stan', 'Ioana', '0756789012', 'Dna.', TO_DATE('1988-09-14', 'YYYY-MM-DD'), 7.5);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Dumitru', 'Gabriel', '0767890123', 'Dl.', TO_DATE('1978-11-03', 'YYYY-MM-DD'), 9.2);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Bălan', 'Claudia', '0778901234', 'Dna.', TO_DATE('1992-04-28', 'YYYY-MM-DD'), 6.5);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Toma', 'Radu', '0789012345', 'Dl.', TO_DATE('1980-01-12', 'YYYY-MM-DD'), 7.0);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Păun', 'Oana', '0790123456', 'Dna.', TO_DATE('1983-02-19', 'YYYY-MM-DD'), 8.0);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Neagu', 'Vasile', '0701234567', 'Dl.', TO_DATE('1993-06-22', 'YYYY-MM-DD'), 9.0);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Munteanu', 'Anca', '0702345678', 'Dna.', TO_DATE('1981-08-13', 'YYYY-MM-DD'), 7.8);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Marin', 'Florin', '0703456789', 'Dl.', TO_DATE('1986-03-05', 'YYYY-MM-DD'), 8.3);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Ilie', 'Mihaela', '0704567890', 'Dna.', TO_DATE('1989-10-17', 'YYYY-MM-DD'), 8.6);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Cristea', 'Ion', '0705678901', 'Dl.', TO_DATE('1991-01-30', 'YYYY-MM-DD'), 6.9);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Iacob', 'Larisa', '0706789012', 'Dna.', TO_DATE('1994-05-08', 'YYYY-MM-DD'), 7.2);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Călinescu', 'George', '0707890123', 'Dl.', TO_DATE('1987-12-02', 'YYYY-MM-DD'), 7.4);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Stoica', 'Viorica', '0708901234', 'Dna.', TO_DATE('1976-11-25', 'YYYY-MM-DD'), 8.1);
  INSERT INTO CLIENT (nume, prenume, nr_telefon, apelativ, data_nastere, nota) VALUES 
  ('Nistor', 'Dan', '0709012345', 'Dl.', TO_DATE('1996-02-15', 'YYYY-MM-DD'), 9.7);


  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Bucuresti', 'Bucuresti');
  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Cluj-Napoca', 'Cluj');
  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Iasi', 'Iasi');
  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Timișoara', 'Timiș');
  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Constanța', 'Constanța');
  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Brașov', 'Brașov');
  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Ploiești', 'Prahova');
  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Arad', 'Arad');
  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Iași', 'Iași');
  INSERT INTO LOCATII (localitate, judet) VALUES 
  ('Sibiu', 'Sibiu');


  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('IF123XYZ', TO_DATE('2020-05-01', 'YYYY-MM-DD'), TO_DATE('2025-06-01', 'YYYY-MM-DD'), 'Dacia', 'Logan');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('BR456ABC', TO_DATE('2021-07-15', 'YYYY-MM-DD'), TO_DATE('2025-08-01', 'YYYY-MM-DD'), 'BMW', 'X5');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('B124DEF', TO_DATE('2019-03-20', 'YYYY-MM-DD'), TO_DATE('2025-09-01', 'YYYY-MM-DD'), 'Audi', 'A4');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('VS56GHI', TO_DATE('2020-11-25', 'YYYY-MM-DD'), TO_DATE('2025-11-15', 'YYYY-MM-DD'), 'Volkswagen', 'Golf');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('BZ17JKL', TO_DATE('2021-08-09', 'YYYY-MM-DD'), TO_DATE('2025-12-01', 'YYYY-MM-DD'), 'Ford', 'Focus');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('GL24MNO', TO_DATE('2020-12-12', 'YYYY-MM-DD'), TO_DATE('2025-12-15', 'YYYY-MM-DD'), 'Mercedes', 'C-Class');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('BR234PQR', TO_DATE('2018-05-18', 'YYYY-MM-DD'), TO_DATE('2025-06-10', 'YYYY-MM-DD'), 'Toyota', 'Corolla');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('CS431STU', TO_DATE('2022-01-22', 'YYYY-MM-DD'), TO_DATE('2025-07-01', 'YYYY-MM-DD'), 'Skoda', 'Octavia');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('DB23VWX', TO_DATE('2019-06-10', 'YYYY-MM-DD'), TO_DATE('2025-08-15', 'YYYY-MM-DD'), 'Renault', 'Megane');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('CL54YZA', TO_DATE('2021-10-30', 'YYYY-MM-DD'), TO_DATE('2025-09-20', 'YYYY-MM-DD'), 'Peugeot', '3008');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('IF123BCD', TO_DATE('2020-02-14', 'YYYY-MM-DD'), TO_DATE('2025-10-01', 'YYYY-MM-DD'), 'Opel', 'Astra');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('IL999EFG', TO_DATE('2019-09-09', 'YYYY-MM-DD'), TO_DATE('2025-11-30', 'YYYY-MM-DD'), 'Hyundai', 'i30');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('MH888HIG', TO_DATE('2021-04-25', 'YYYY-MM-DD'), TO_DATE('2025-12-01', 'YYYY-MM-DD'), 'Honda', 'Civic');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('NT777JKL', TO_DATE('2022-06-12', 'YYYY-MM-DD'), TO_DATE('2025-10-20', 'YYYY-MM-DD'), 'Kia', 'Sportage');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('MS66LMN', TO_DATE('2021-09-17', 'YYYY-MM-DD'), TO_DATE('2025-11-15', 'YYYY-MM-DD'), 'Mazda', '3');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('PT555OPQ', TO_DATE('2019-11-30', 'YYYY-MM-DD'), TO_DATE('2025-12-01', 'YYYY-MM-DD'), 'Nissan', 'Qashqai');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('CT444RST', TO_DATE('2020-08-01', 'YYYY-MM-DD'), TO_DATE('2025-06-30', 'YYYY-MM-DD'), 'Citroen', 'C4');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('B33UVW', TO_DATE('2021-02-22', 'YYYY-MM-DD'), TO_DATE('2025-07-01', 'YYYY-MM-DD'), 'Seat', 'Leon');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('B222XYZ', TO_DATE('2018-01-10', 'YYYY-MM-DD'), TO_DATE('2025-08-15', 'YYYY-MM-DD'), 'Peugeot', '208');
  INSERT INTO MASINA (numar_masina, data_achizitionare, data_revizie_urm, marca, model) VALUES 
  ('B11ABC', TO_DATE('2021-12-05', 'YYYY-MM-DD'), TO_DATE('2025-09-20', 'YYYY-MM-DD'), 'Fiat', 'Punto');


  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Popescu', 'Ion', '0720123456', 'Sofer', TO_DATE('1985-03-15', 'YYYY-MM-DD'), TO_DATE('2020-01-10', 'YYYY-MM-DD'), 3500, '2', NULL);
  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Ionescu', 'Maria', '0745123456', 'Sofer', TO_DATE('1990-06-25', 'YYYY-MM-DD'), TO_DATE('2021-03-15', 'YYYY-MM-DD'), 3000, '3', NULL);
  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Vasilescu', 'George', '0734123456', 'Sofer', TO_DATE('1982-11-05', 'YYYY-MM-DD'), TO_DATE('2019-05-22', 'YYYY-MM-DD'), 3800, '1', NULL);
  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Georgescu', 'Ana', '0765123456', 'Dispecer', TO_DATE('1987-02-15', 'YYYY-MM-DD'), TO_DATE('2018-09-01', 'YYYY-MM-DD'), 4200, NULL, 'Titan');
  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Mihail', 'Adrian', '0785123456', 'Sofer', TO_DATE('1989-08-10', 'YYYY-MM-DD'), TO_DATE('2020-07-01', 'YYYY-MM-DD'), 3400, '7', NULL);
  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Stan', 'Florin', '0756123456', 'Dispecer', TO_DATE('1983-12-20', 'YYYY-MM-DD'), TO_DATE('2017-04-10', 'YYYY-MM-DD'), 4300, NULL, 'Dristor');
  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Radu', 'Elena', '0723123456', 'Sofer', TO_DATE('1995-01-12', 'YYYY-MM-DD'), TO_DATE('2022-06-20', 'YYYY-MM-DD'), 3100, '8', NULL);
  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Bucur', 'Marian', '0741123456', 'Sofer', TO_DATE('1992-07-30', 'YYYY-MM-DD'), TO_DATE('2021-05-12', 'YYYY-MM-DD'), 3200, '11', NULL);
  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Popa', 'Vlad', '0729123456', 'Dispecer', TO_DATE('1986-04-28', 'YYYY-MM-DD'), TO_DATE('2019-11-15', 'YYYY-MM-DD'), 4000, NULL, 'Titan');
  INSERT INTO ANGAJAT (nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina, dispecerat) VALUES 
  ('Dima', 'Ioana', '0798123456', 'Sofer', TO_DATE('1980-09-22', 'YYYY-MM-DD'), TO_DATE('2018-02-05', 'YYYY-MM-DD'), 3600, '12', NULL);


  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (1, 1);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (2, 1);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (3, 1);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (5, 1);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (7, 1);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (8, 1);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (5, 2);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (7, 2);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (10, 2);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (1, 3);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (2, 3);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (8, 3);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (2, 4);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (8, 4);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (1, 5);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (2, 5);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (1, 6);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (2, 7);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (3, 8);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (5, 9);
  INSERT INTO LUCREAZA_IN (cod_angajat, cod_locatie) VALUES (7, 10);


  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (1, 1, 1, 'Strada Victoriei 10', 'Strada Bisericii 3', 1);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (2, 2, 2, 'Strada Ciresilor 7', 'Strada Stefan cel Mare 12', 1);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (3, 3, 3, 'Strada Lalelelor 5', 'Strada Principala 9', 1);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (4, 5, 4, 'Strada Teiului 6', 'Strada Muresului 8', 2);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (5, 7, 5, 'Strada Moara de Vant 3', 'Strada Alba Iulia 2', 2);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (6, 8, 6, 'Strada Nordului 1', 'Strada Unirii 15', 2);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (7, 1, 7, 'Strada Stelea 11', 'Strada Gheorgheni 4', 3);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (8, 2, 8, 'Strada Căpitanilor 7', 'Strada Mureșului 13', 3);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (9, 3, 9, 'Strada Valea Lunga 8', 'Strada Moșilor 10', 3);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (10, 5, 10, 'Strada Făgetului 9', 'Strada Ferdinand 6', 4);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (12, 7, 11, 'Strada Carpați 5', 'Strada Iancu de Hunedoara 7', 4);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (11, 8, 12, 'Strada Gheorgheni 10', 'Strada Piatra Mare 3', 4);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (1, 1, 13, 'Strada Păcii 4', 'Strada Andrei Mureșanu 2', 5);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (1, 2, 14, 'Strada Dacia 5', 'Strada Ion Ionescu 7', 5);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (2, 3, 15, 'Strada Abatorului 8', 'Strada Garajului 12', 5);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (2, 5, 16, 'Strada Pădurii 9', 'Strada Revoluției 13, Hunedoara', 6);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (3, 7, 17, 'Strada Viitorului 12', 'Strada Dumitru Ciuca 5', 6);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (7, 8, 18, 'Strada Adunați 15', 'Strada Petru Rareș 6', 6);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (8, 1, 19, 'Strada Mărului 3', 'Strada Gheorghe Doja 10', 7);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (11, 2, 1, 'Strada Arcului 8', 'Strada Lăcrămioarei 12', 7);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (11, 3, 2, 'Strada Călărașilor 1', 'Strada Gării 4', 7);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (12, 5, 5, 'Strada Perlei 10', 'Strada Brătianu 6', 8);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (1, 7, 1, 'Strada Sălciilor 3', 'Strada Alexandru Ioan Cuza 7', 8);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (7, 8, 2, 'Strada Albinelor 8', 'Strada Căpitan Ignat 3', 8);
  INSERT INTO CURSA (cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie) VALUES
  (8, 1, 1, 'Strada Găgești 4', 'Strada Filimon 12', 9);


  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (1, TO_DATE('2025-02-01', 'YYYY-MM-DD'), 8, 9);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (2, TO_DATE('2025-02-02', 'YYYY-MM-DD'), 7, 8);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (3, TO_DATE('2025-02-03', 'YYYY-MM-DD'), 9, 9);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (4, TO_DATE('2025-02-04', 'YYYY-MM-DD'), 6, 7);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (5, TO_DATE('2025-02-05', 'YYYY-MM-DD'), 8, 7);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (6, TO_DATE('2025-02-06', 'YYYY-MM-DD'), 9, 8);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (7, TO_DATE('2025-02-07', 'YYYY-MM-DD'), 7, 6);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (8, TO_DATE('2025-02-08', 'YYYY-MM-DD'), 8, 8);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (9, TO_DATE('2025-02-09', 'YYYY-MM-DD'), 6, 6);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (10, TO_DATE('2025-02-10', 'YYYY-MM-DD'), 9, 8);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (11, TO_DATE('2025-02-11', 'YYYY-MM-DD'), 7, 7);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (12, TO_DATE('2025-02-12', 'YYYY-MM-DD'), 8, 8);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (13, TO_DATE('2025-02-13', 'YYYY-MM-DD'), 7, 7);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (14, TO_DATE('2025-02-14', 'YYYY-MM-DD'), 6, 8);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (15, TO_DATE('2025-02-15', 'YYYY-MM-DD'), 8, 8);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (16, TO_DATE('2025-02-16', 'YYYY-MM-DD'), 9, 9);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (17, TO_DATE('2025-02-17', 'YYYY-MM-DD'), 7, 6);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (18, TO_DATE('2025-02-18', 'YYYY-MM-DD'), 6, 7);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (19, TO_DATE('2025-02-19', 'YYYY-MM-DD'), 9, 9);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (20, TO_DATE('2025-02-20', 'YYYY-MM-DD'), 8, 7);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (21, TO_DATE('2025-02-21', 'YYYY-MM-DD'), 8, 8);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (22, TO_DATE('2025-02-22', 'YYYY-MM-DD'), 7, 9);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (23, TO_DATE('2025-02-23', 'YYYY-MM-DD'), 6, 7);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (24, TO_DATE('2025-02-24', 'YYYY-MM-DD'), 9, 6);
  INSERT INTO DETALII_CURSA (cod_cursa, data_cursa, nota_sofer, nota_client) VALUES
  (25, TO_DATE('2025-02-25', 'YYYY-MM-DD'), 8, 7);


  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(11,10);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(10,7);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(9,5);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(8,2);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(7,1);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(6,0);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(5,0);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(4,0);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(3,0);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(2,0);
  INSERT INTO DISCOUNT (nota_discount, cod_discount)
  VALUES(1,0);


  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (4, 1, 55.20);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (6, 2, 60.75);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (9, 3, 45.30);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (4, 4, 70.60);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (6, 5, 50.90);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (9, 6, 63.00);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (4, 7, 38.80);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (6, 8, 32.20);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (9, 9, 72.40);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (4, 10, 64.10);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (6, 11, 55.50);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (9, 12, 78.30);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (4, 13, 48.50);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (6, 14, 60.00);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (9, 15, 45.30);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (4, 16, 39.70);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (6, 17, 28.80);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (9, 18, 62.60);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (4, 19, 51.90);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (6, 20, 46.50);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (9, 21, 38.40);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (4, 22, 29.00);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (6, 23, 25.10);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (9, 24, 60.80);
  INSERT INTO FACTURA (cod_dispecer, cod_cursa, pret) VALUES (4, 25, 53.20);


  INSERT INTO ISTORIC_SOFER (cod_sofer, nota, numar_curse) VALUES (1, 7.8, 5);
  INSERT INTO ISTORIC_SOFER (cod_sofer, nota, numar_curse) VALUES (2, 7.25, 4);
  INSERT INTO ISTORIC_SOFER (cod_sofer, nota, numar_curse) VALUES (3, 7.75, 4);
  INSERT INTO ISTORIC_SOFER (cod_sofer, nota, numar_curse) VALUES (5, 7.75, 4);
  INSERT INTO ISTORIC_SOFER (cod_sofer, nota, numar_curse) VALUES (7, 7, 4);
  INSERT INTO ISTORIC_SOFER (cod_sofer, nota, numar_curse) VALUES (8, 8, 4);

  COMMIT;

END;