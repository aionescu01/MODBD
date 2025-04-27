CREATE TABLE CLIENT (
    cod_client NUMBER(6) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nume VARCHAR2(25) NOT NULL,
    prenume VARCHAR2(25) NOT NULL,
    nr_telefon VARCHAR2(12) NOT NULL,
    apelativ VARCHAR2(5),
    data_nastere DATE NOT NULL,
    nota NUMBER(3,1) NOT NULL
);

CREATE TABLE MASINA (
    cod_masina NUMBER(6) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    numar_masina VARCHAR2(10),
    data_achizitionare DATE NOT NULL,
    data_revizie_urm DATE NOT NULL,
    marca VARCHAR2(20) NOT NULL,
    model VARCHAR2(20) NOT NULL
);

CREATE TABLE ANGAJAT (
    cod_angajat NUMBER(6) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nume VARCHAR2(25) NOT NULL,
    prenume VARCHAR2(25) NOT NULL,
    nr_telefon VARCHAR2(12) NOT NULL,
    tip_angajat VARCHAR2(25) NOT NULL,
    data_nastere DATE NOT NULL,
    data_angajare DATE NOT NULL,
    salariu NUMBER(6) NOT NULL,
    cod_masina NUMBER(6),
    dispecerat VARCHAR2(25),
    CONSTRAINT unic UNIQUE (cod_masina),
    CONSTRAINT fkey_masina FOREIGN KEY (cod_masina) REFERENCES MASINA(cod_masina)
);

CREATE TABLE LOCATII (
    cod_locatie NUMBER(4) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    localitate VARCHAR2(20) NOT NULL,
    judet VARCHAR2(20) NOT NULL
);

CREATE TABLE CURSA (
    cod_cursa NUMBER(6) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cod_masina NUMBER(6) CONSTRAINT fkey_masina2 REFERENCES MASINA(cod_masina) NOT NULL,
    cod_sofer NUMBER(5) CONSTRAINT fkey_sofer2 REFERENCES ANGAJAT(cod_angajat) NOT NULL,
    cod_client NUMBER(6) CONSTRAINT fkey_client2 REFERENCES CLIENT(cod_client) NOT NULL,
    adresa_client VARCHAR2(35) NOT NULL,
    destinatie VARCHAR2(35) NOT NULL,
    cod_locatie NUMBER(4) CONSTRAINT fkey_loc1 REFERENCES LOCATII(cod_locatie) NOT NULL
);

CREATE TABLE DETALII_CURSA (
    cod_cursa NUMBER(6) CONSTRAINT pkey_det_cursa PRIMARY KEY,
    CONSTRAINT fkey_cod_cursa FOREIGN KEY (cod_cursa) REFERENCES CURSA(cod_cursa),
    data_cursa DATE NOT NULL,
    nota_sofer NUMBER(2) NOT NULL,
    nota_client NUMBER(2) NOT NULL
);

CREATE TABLE ISTORIC_SOFER (
    cod_sofer NUMBER(6) CONSTRAINT pkey_ist_sof PRIMARY KEY,
    CONSTRAINT fkey_cod_sof FOREIGN KEY (cod_sofer) REFERENCES ANGAJAT(cod_angajat),
    nota NUMBER(4,2) NOT NULL,
    numar_curse NUMBER(5) NOT NULL
);

CREATE TABLE DISCOUNT (
    nota_discount NUMBER(2) CONSTRAINT pkey_disc PRIMARY KEY NOT NULL,
    cod_discount NUMBER(2)
);

CREATE TABLE FACTURA (
    cod_factura NUMBER(6) GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    cod_dispecer NUMBER(5) CONSTRAINT fkey_disp REFERENCES ANGAJAT(cod_angajat) NOT NULL,
    cod_cursa NUMBER(6) CONSTRAINT fkey_crs REFERENCES CURSA(cod_cursa) NOT NULL,
    pret NUMBER(5,2) NOT NULL
);

CREATE TABLE LUCREAZA_IN (
    cod_angajat NUMBER(5) CONSTRAINT fkey_ang REFERENCES ANGAJAT(cod_angajat),
    cod_locatie NUMBER(5) CONSTRAINT fkey_loc REFERENCES LOCATII(cod_locatie),
    CONSTRAINT pk_compus PRIMARY KEY(cod_angajat, cod_locatie)
);

CREATE TABLE MESAJE (
    MESSAGE_ID NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    MESSAGE VARCHAR2(255),
    MESSAGE_TYPE VARCHAR2(1) CHECK (MESSAGE_TYPE IN ('E', 'W', 'I')),
    CREATED_BY VARCHAR2(40) NOT NULL,
    CREATED_AT DATE NOT NULL
);