INSERT INTO Dim_Client (Cod_Client, Nume_Client, Nota_Client, Apelativ, Data_nastere)
SELECT 
    cod_client,
    TRIM(nume || ' ' || prenume) AS Nume_Client,
    nota AS Nota_Client,
    NVL(apelativ, 'N/A') AS Apelativ,
    data_nastere AS Data_Nastere
FROM CLIENT;

INSERT INTO Dim_Masina (Cod_Masina, Marca, Model, Data_Achizitionare, Data_Revizie_Urm)
SELECT 
    cod_masina,
    marca,
    model,
    data_achizitionare,
    data_revizie_urm
FROM MASINA;

INSERT INTO Dim_Angajat (Cod_Angajat, Nume_Angajat, Tip_Angajat, Data_Angajare, Salariu)
SELECT 
    cod_angajat,
    TRIM(nume || ' ' || prenume) AS Nume_Angajat,
    tip_angajat,
    data_angajare,
    salariu
FROM ANGAJAT
WHERE tip_angajat IN ('Sofer','Dispecer');

INSERT INTO Dim_Factura (Cod_Factura, Cod_Dispecer, Cod_cursa, Data_emitere, Pret)
SELECT 
    cod_factura,
    cod_dispecer,
    f.cod_cursa,
    d.data_cursa,
    pret
FROM FACTURA f JOIN CURSA c ON f.cod_cursa=c.cod_cursa
JOIN DETALII_CURSA d ON d.cod_cursa=c.cod_cursa
WHERE pret>0;

INSERT INTO Dim_Timp (Data, Anul, Luna, Nume_Luna, Trimestru, Ziua, Ziua_Saptamanii, Nume_Zi, Este_Weekend)
WITH Date_Range AS (
    SELECT DATE '2021-01-01' + LEVEL - 1 AS Data
    FROM DUAL
    CONNECT BY LEVEL <= 365 * 9
)
SELECT 
    Data,
    EXTRACT(YEAR FROM Data) AS Anul,
    EXTRACT(MONTH FROM Data) AS Luna,
    TO_CHAR(Data, 'Month', 'NLS_DATE_LANGUAGE=ROMANIAN') AS Nume_Luna,
    CEIL(EXTRACT(MONTH FROM Data) / 3) AS Trimestru,
    EXTRACT(DAY FROM Data) AS Ziua,
    TO_NUMBER(TO_CHAR(Data, 'D')) AS Ziua_Saptamanii,
    TO_CHAR(Data, 'Day', 'NLS_DATE_LANGUAGE=ROMANIAN') AS Nume_Zi,
    CASE WHEN TO_NUMBER(TO_CHAR(Data, 'D')) IN (6, 7) THEN 1 ELSE 0 END AS Este_Weekend
FROM Date_Range;

INSERT INTO Dim_Locatie (Cod_Locatie, Localitate, Judet)
SELECT 
    Cod_Locatie,
    localitate,
    judet
FROM LOCATII;

INSERT INTO F_Cursa (Cod_Cursa, Nota_Sofer, Nota_Client, Cod_Factura, Cod_Client, Cod_angajat, Cod_Masina, Cod_Locatie, Cod_Timp)
SELECT 
    c.cod_cursa,
    d.nota_sofer,
    d.nota_client,
    f.cod_factura,
    c.cod_client,
    a.cod_angajat,
    c.cod_sofer,
    c.cod_masina,
    c.cod_locatie,
    t.cod_timp
FROM FACTURA f
JOIN CURSA c ON f.cod_cursa = c.cod_cursa
JOIN DETALII_CURSA d ON c.cod_cursa = d.cod_cursa
JOIN ANGAJAT a ON c.cod_sofer=a.cod_angajat
JOIN DIM_TIMP t ON d.data_cursa=t.data;