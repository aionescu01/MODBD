-- Dim_Client
CREATE TABLE Dim_Client (
    Cod_Client INT PRIMARY KEY,
    Nume_Client VARCHAR(255) NOT NULL,
    Nota_Client NUMBER(3,1) CHECK (Nota_Client BETWEEN 1 AND 10),
    Apelativ VARCHAR(50),
    data_nastere DATE NOT NULL
)
PARTITION BY RANGE (Nota_Client) (
    PARTITION Dim_Client_Slab VALUES LESS THAN (7),       
    PARTITION Dim_Client_Mediu VALUES LESS THAN (9),      
    PARTITION Dim_Client_Premium VALUES LESS THAN (10.1),
    PARTITION Dim_Client_Default VALUES LESS THAN (MAXVALUE)
);

-- Dim_Angajat
CREATE TABLE Dim_Angajat (
    Cod_Angajat INT PRIMARY KEY,
    Nume_Angajat VARCHAR(255) NOT NULL,
    Tip_Angajat VARCHAR(50),
    Data_Angajare DATE,
    Salariu DECIMAL(10, 2),
    CONSTRAINT SALARIU_CHECK CHECK (Salariu > 0)
);

-- Dim_Masina
CREATE TABLE Dim_Masina (
    Cod_Masina INT PRIMARY KEY,
    Marca VARCHAR(100) NOT NULL,
    Model VARCHAR(100) NOT NULL,
    Data_Achizitionare DATE NOT NULL,
    Data_Revizie_Urm DATE NOT NULL,
    CONSTRAINT DATA_REVIZIE_CHECK CHECK (Data_Revizie_Urm >= Data_Achizitionare)
);

-- Dim_Timp
CREATE TABLE Dim_Timp (
    Cod_Timp INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    Data DATE NOT NULL,
    Anul INT NOT NULL,
    Luna INT NOT NULL,
    Nume_Luna VARCHAR(20) NOT NULL,
    Trimestru INT NOT NULL,
    Ziua INT NOT NULL,
    Ziua_Saptamanii INT NOT NULL,
    Nume_Zi VARCHAR(20) NOT NULL,
    Este_Weekend INT NOT NULL,
    CONSTRAINT ANUL_CHECK CHECK (Anul > 0),
    CONSTRAINT LUNA_CHECK CHECK (Luna BETWEEN 1 AND 12),
    CONSTRAINT TRIMESTRU_CHECK CHECK (Trimestru BETWEEN 1 AND 4),
    CONSTRAINT ZIUA_CHECK CHECK (Ziua BETWEEN 1 AND 31),
    CONSTRAINT ZIUA_SAPTAMANII_CHECK CHECK (Ziua_Saptamanii BETWEEN 1 AND 7),
    CONSTRAINT ESTE_WEEKEND_CHECK CHECK (Este_Weekend IN (0, 1))
);

-- Dim_Factura
CREATE TABLE Dim_Factura (
    Cod_Factura INT PRIMARY KEY,
    cod_dispecer NUMBER(6),
    cod_cursa NUMBER(6),
    Data_Emitere DATE NOT NULL,
    Pret DECIMAL(10, 2),
    CONSTRAINT PRET_CHECK CHECK (Pret >= 0)
);

-- Dim_Locatie
CREATE TABLE Dim_Locatie (
    Cod_Locatie INT PRIMARY KEY,
    Localitate VARCHAR2(100) NOT NULL,
    Judet VARCHAR2(100) NOT NULL         
);

-- F_Cursa
CREATE TABLE F_Cursa (
    Cod_cursa INT PRIMARY KEY,
    Nota_Sofer NUMBER(3,1),
    Nota_Client NUMBER(3,1),
    Cod_Factura INT NOT NULL,
    Cod_Client INT NOT NULL,
    Cod_Angajat INT NOT NULL,
    Cod_Masina INT NOT NULL,
    Cod_Locatie INT NOT NULL,
    Cod_Timp INT NOT NULL,
    CONSTRAINT NOTA_SOFER_CHECK CHECK (Nota_Sofer BETWEEN 1 AND 10),
    CONSTRAINT NOTA_CLIENT_FCURSA_CHECK CHECK (Nota_Client BETWEEN 1 AND 10),
    FOREIGN KEY (Cod_Client) REFERENCES Dim_Client(Cod_Client),
    FOREIGN KEY (Cod_Masina) REFERENCES Dim_Masina(Cod_Masina),
    FOREIGN KEY (Cod_Angajat) REFERENCES Dim_Angajat(Cod_Angajat),
    FOREIGN KEY (Cod_Timp) REFERENCES Dim_Timp(Cod_Timp),
    FOREIGN KEY (Cod_Factura) REFERENCES Dim_Factura(Cod_Factura),
    FOREIGN KEY (Cod_Locatie) REFERENCES Dim_Locatie(Cod_Locatie)
)
PARTITION BY RANGE (cod_timp) (
    PARTITION BEFORE VALUES LESS THAN (1462),
    PARTITION N1_45_2025 VALUES LESS THAN (1507),
    PARTITION N2_45_2025 VALUES LESS THAN (1552),
    PARTITION AFTER VALUES LESS THAN (MAXVALUE)
);