-- 5.Asigurarea sincronizării datelor pentru relațiile replicate

BEGIN
    -- TRIGGERI LOCATII

    -- TRIGGER PENTRU INSERARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_ins_locatie
        AFTER INSERT ON LOCATII
        FOR EACH ROW
        DECLARE
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Obține județul din locație
            SELECT judet INTO v_judet
            FROM LOCATII
            WHERE cod_locatie = :NEW.cod_locatie;

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

            -- Sincronizare cu fragmentele orizontale

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') THEN
                INSERT INTO LOCATII_NORD@NORD_LINK (cod_locatie, localitate, judet)
                VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
            ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') THEN
                INSERT INTO LOCATII_SUD@SUD_LINK (cod_locatie, localitate, judet)
                VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
            ELSE
                INSERT INTO LOCATII_CENTRAL@CENTRAL_LINK (cod_locatie, localitate, judet)
                VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
            END IF;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert LOCATIE '' || :NEW.cod_locatie, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ACTUALIZARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_upd_locatie
            AFTER UPDATE ON LOCATII
            FOR EACH ROW
        DECLARE
            CURSOR c_judet IS
                SELECT judet
                FROM LOCATII
                WHERE cod_locatie = :NEW.cod_locatie;
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Deschide cursorul
            OPEN c_judet;
            LOOP
                FETCH c_judet INTO v_judet;
                EXIT WHEN c_judet%NOTFOUND;

                -- Normalizează județul (elimină diacriticele)
                v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

                -- Sincronizare cu fragmentele orizontale

                IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') THEN
                    UPDATE LOCATII_NORD@NORD_LINK
                    SET localitate = :NEW.localitate,
                        judet = :NEW.judet
                    WHERE cod_locatie = :NEW.cod_locatie;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO LOCATII_NORD@NORD_LINK (cod_locatie, localitate, judet)
                        VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
                    END IF;

                ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') THEN
                    UPDATE LOCATII_SUD@SUD_LINK
                    SET localitate = :NEW.localitate,
                        judet = :NEW.judet
                    WHERE cod_locatie = :NEW.cod_locatie;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO LOCATII_SUD@SUD_LINK (cod_locatie, localitate, judet)
                        VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
                    END IF;

                ELSE
                    UPDATE LOCATII_CENTRAL@CENTRAL_LINK
                    SET localitate = :NEW.localitate,
                        judet = :NEW.judet
                    WHERE cod_locatie = :NEW.cod_locatie;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO LOCATII_CENTRAL@CENTRAL_LINK (cod_locatie, localitate, judet)
                        VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
                    END IF;
                END IF;
            END LOOP;

            CLOSE c_judet;

            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update LOCATIE '' || :NEW.cod_locatie, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_locatie
        AFTER DELETE ON LOCATII
        FOR EACH ROW
        BEGIN
            -- Șterge din toate locațiile
            DELETE FROM LOCATII_NORD@NORD_LINK WHERE cod_locatie = :OLD.cod_locatie;
            DELETE FROM LOCATII_SUD@SUD_LINK WHERE cod_locatie = :OLD.cod_locatie;
            DELETE FROM LOCATII_CENTRAL@CENTRAL_LINK WHERE cod_locatie = :OLD.cod_locatie;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete LOCATIE '' || :OLD.cod_locatie, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGERI ANGAJAT

    -- TRIGGER PENTRU INSERARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_ins_angajat
        AFTER INSERT ON ANGAJAT
        FOR EACH ROW
        DECLARE
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Obține județul din locație
            SELECT judet INTO v_judet
            FROM LOCATII L
            JOIN LUCREAZA_IN LI ON L.cod_locatie = LI.cod_locatie
            WHERE LI.cod_angajat = :NEW.cod_angajat;

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

            -- Sincronizare cu fragmentele orizontale

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') THEN
                INSERT INTO ANGAJAT_NORD@NORD_LINK (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume, :NEW.nr_telefon, :NEW.tip_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
            ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') THEN
                INSERT INTO ANGAJAT_SUD@SUD_LINK (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume, :NEW.nr_telefon, :NEW.tip_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
            ELSE
                INSERT INTO ANGAJAT_CENTRAL@CENTRAL_LINK (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume, :NEW.nr_telefon, :NEW.tip_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
            END IF;

            -- Sincronizare cu fragmentele verticale

            INSERT INTO ANGAJAT_HR@ARHIVA_LINK (cod_angajat, data_nastere, data_angajare, salariu, cod_masina)
            VALUES (:NEW.cod_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);

            INSERT INTO ANGAJAT_IDENTITY@CENTRAL_LINK (cod_angajat, nume, prenume)
            VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume);

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Suceava'', ''Botoșani'', ''Iași'', ''Neamț'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Sălaj'', ''Bihor'', ''Cluj'', ''Timiș'', ''Brașov'', ''Arad'', ''Sibiu'', ''Alba'', ''Bacău'', ''Hunedoara'', ''Galați'', ''Harghita'', ''Covasna'', ''Mureș'', ''Vaslui'') THEN
                INSERT INTO ANGAJAT_CONTACT@NORD_LINK (cod_angajat, nr_telefon, tip_angajat)
                VALUES (:NEW.cod_angajat, :NEW.nr_telefon, :NEW.tip_angajat);
            ELSE
                INSERT INTO ANGAJAT_CONTACT@SUD_LINK (cod_angajat, nr_telefon, tip_angajat)
                VALUES (:NEW.cod_angajat, :NEW.nr_telefon, :NEW.tip_angajat);
            END IF;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert ANGAJAT '' || :NEW.cod_angajat, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ACTUALIZARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_upd_angajat
            AFTER UPDATE ON ANGAJAT
            FOR EACH ROW
        DECLARE
            CURSOR c_judet IS
                SELECT judet
                FROM LOCATII L
                JOIN LUCREAZA_IN LI ON L.cod_locatie = LI.cod_locatie
                WHERE LI.cod_angajat = :NEW.cod_angajat;
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Deschide cursorul
            OPEN c_judet;
            LOOP
                FETCH c_judet INTO v_judet;
                EXIT WHEN c_judet%NOTFOUND;

                -- Normalizează județul (elimină diacriticele)
                v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

                -- Sincronizare cu fragmentele orizontale

                IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') THEN
                    UPDATE ANGAJAT_NORD@NORD_LINK
                    SET nume = :NEW.nume,
                        prenume = :NEW.prenume,
                        nr_telefon = :NEW.nr_telefon,
                        tip_angajat = :NEW.tip_angajat,
                        data_nastere = :NEW.data_nastere,
                        data_angajare = :NEW.data_angajare,
                        salariu = :NEW.salariu,
                        cod_masina = :NEW.cod_masina
                    WHERE cod_angajat = :NEW.cod_angajat;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO ANGAJAT_NORD@NORD_LINK
                        (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                        VALUES
                        (:NEW.cod_angajat, :NEW.nume, :NEW.prenume, :NEW.nr_telefon, :NEW.tip_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
                    END IF;

                ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') THEN
                    UPDATE ANGAJAT_SUD@SUD_LINK
                    SET nume = :NEW.nume,
                        prenume = :NEW.prenume,
                        nr_telefon = :NEW.nr_telefon,
                        tip_angajat = :NEW.tip_angajat,
                        data_nastere = :NEW.data_nastere,
                        data_angajare = :NEW.data_angajare,
                        salariu = :NEW.salariu,
                        cod_masina = :NEW.cod_masina
                    WHERE cod_angajat = :NEW.cod_angajat;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO ANGAJAT_SUD@SUD_LINK
                        (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                        VALUES
                        (:NEW.cod_angajat, :NEW.nume, :NEW.prenume, :NEW.nr_telefon, :NEW.tip_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
                    END IF;

                ELSE
                    UPDATE ANGAJAT_CENTRAL@CENTRAL_LINK
                    SET nume = :NEW.nume,
                        prenume = :NEW.prenume,
                        nr_telefon = :NEW.nr_telefon,
                        tip_angajat = :NEW.tip_angajat,
                        data_nastere = :NEW.data_nastere,
                        data_angajare = :NEW.data_angajare,
                        salariu = :NEW.salariu,
                        cod_masina = :NEW.cod_masina
                    WHERE cod_angajat = :NEW.cod_angajat;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO ANGAJAT_CENTRAL@CENTRAL_LINK
                        (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                        VALUES
                        (:NEW.cod_angajat, :NEW.nume, :NEW.prenume, :NEW.nr_telefon, :NEW.tip_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
                    END IF;
                END IF;

                -- Sincronizare cu fragmentele verticale

                UPDATE ANGAJAT_HR@ARHIVA_LINK
                SET data_nastere = :NEW.data_nastere,
                    data_angajare = :NEW.data_angajare,
                    salariu = :NEW.salariu,
                    cod_masina = :NEW.cod_masina
                WHERE cod_angajat = :NEW.cod_angajat;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO ANGAJAT_HR@ARHIVA_LINK (cod_angajat, data_nastere, data_angajare, salariu, cod_masina)
                    VALUES (:NEW.cod_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
                END IF;

                UPDATE ANGAJAT_IDENTITY@CENTRAL_LINK
                SET nume = :NEW.nume,
                    prenume = :NEW.prenume
                WHERE cod_angajat = :NEW.cod_angajat;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO ANGAJAT_IDENTITY@CENTRAL_LINK (cod_angajat, nume, prenume)
                    VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume);
                END IF;

                -- Verifică județul și inserează în tabela corespunzătoare
                IF v_judet_normalizat IN (''Suceava'', ''Botoșani'', ''Iași'', ''Neamț'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Sălaj'', ''Bihor'', ''Cluj'', ''Timiș'', ''Brașov'', ''Arad'', ''Sibiu'', ''Alba'', ''Bacău'', ''Hunedoara'', ''Galați'', ''Harghita'', ''Covasna'', ''Mureș'', ''Vaslui'') THEN
                    UPDATE ANGAJAT_CONTACT@NORD_LINK
                    SET nr_telefon = :NEW.nr_telefon,
                        tip_angajat = :NEW.tip_angajat
                    WHERE cod_angajat = :NEW.cod_angajat;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO ANGAJAT_CONTACT@NORD_LINK (cod_angajat, nr_telefon, tip_angajat)
                        VALUES (:NEW.cod_angajat, :NEW.nr_telefon, :NEW.tip_angajat);
                    END IF;
                ELSE
                    UPDATE ANGAJAT_CONTACT@SUD_LINK
                    SET nr_telefon = :NEW.nr_telefon,
                        tip_angajat = :NEW.tip_angajat
                    WHERE cod_angajat = :NEW.cod_angajat;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO ANGAJAT_CONTACT@SUD_LINK (cod_angajat, nr_telefon, tip_angajat)
                        VALUES (:NEW.cod_angajat, :NEW.nr_telefon, :NEW.tip_angajat);
                    END IF;
                END IF;
            END LOOP;

            CLOSE c_judet;

            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update ANGAJAT '' || :NEW.cod_angajat, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_angajat
        AFTER DELETE ON ANGAJAT
        FOR EACH ROW
        BEGIN
            -- Șterge din toate locațiile
            DELETE FROM ANGAJAT_NORD@NORD_LINK WHERE cod_angajat = :OLD.cod_angajat;
            DELETE FROM ANGAJAT_SUD@SUD_LINK WHERE cod_angajat = :OLD.cod_angajat;
            DELETE FROM ANGAJAT_CENTRAL@CENTRAL_LINK WHERE cod_angajat = :OLD.cod_angajat;
            DELETE FROM ANGAJAT_HR@ARHIVA_LINK WHERE cod_angajat = :OLD.cod_angajat;
            DELETE FROM ANGAJAT_IDENTITY@CENTRAL_LINK WHERE cod_angajat = :OLD.cod_angajat;
            DELETE FROM ANGAJAT_CONTACT@NORD_LINK WHERE cod_angajat = :OLD.cod_angajat;
            DELETE FROM ANGAJAT_CONTACT@SUD_LINK WHERE cod_angajat = :OLD.cod_angajat;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete ANGAJAT '' || :OLD.cod_angajat, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGERI CLIENT

    -- TRIGGER PENTRU INSERARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_ins_client
        AFTER INSERT ON CLIENT
        FOR EACH ROW
        DECLARE
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Obține județul din locație
            SELECT judet INTO v_judet
            FROM LOCATII L
            JOIN CURSA C ON L.cod_locatie = C.cod_locatie
            WHERE C.cod_client = :NEW.cod_client;

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

            -- Sincronizare cu fragmentele verticale

            INSERT INTO CLIENT_PROFIL@ARHIVA_LINK (cod_client, data_nastere, nota)
            VALUES (:NEW.cod_client, :NEW.data_nastere, :NEW.nota);

            INSERT INTO CLIENT_IDENTITY@CENTRAL_LINK (cod_client, nume, prenume)
            VALUES (:NEW.cod_client, :NEW.nume, :NEW.prenume);

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Suceava'', ''Botoșani'', ''Iași'', ''Neamț'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Sălaj'', ''Bihor'', ''Cluj'', ''Timiș'', ''Brașov'', ''Arad'', ''Sibiu'', ''Alba'', ''Bacău'', ''Hunedoara'', ''Galați'', ''Harghita'', ''Covasna'', ''Mureș'', ''Vaslui'') THEN
                INSERT INTO CLIENT_CONTACT@NORD_LINK (cod_client, nr_telefon, apelativ)
                VALUES (:NEW.cod_client, :NEW.nr_telefon, :NEW.apelativ);
            ELSE
                INSERT INTO CLIENT_CONTACT@SUD_LINK (cod_client, nr_telefon, apelativ)
                VALUES (:NEW.cod_client, :NEW.nr_telefon, :NEW.apelativ);
            END IF;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert CLIENT '' || :NEW.cod_client, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ACTUALIZARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_upd_client
            AFTER UPDATE ON CLIENT
            FOR EACH ROW
        DECLARE
            CURSOR c_judet IS
                SELECT judet
                FROM LOCATII L
                JOIN CURSA C ON L.cod_locatie = C.cod_locatie
                WHERE C.cod_client = :NEW.cod_client;
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Deschide cursorul
            OPEN c_judet;
            LOOP
                FETCH c_judet INTO v_judet;
                EXIT WHEN c_judet%NOTFOUND;

                -- Normalizează județul (elimină diacriticele)
                v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

                -- Sincronizare cu fragmentele verticale

                UPDATE CLIENT_PROFIL@ARHIVA_LINK
                SET data_nastere = :NEW.data_nastere,
                    nota = :NEW.nota
                WHERE cod_client = :NEW.cod_client;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO CLIENT_PROFIL@ARHIVA_LINK (cod_client, data_nastere, nota)
                    VALUES (:NEW.cod_client, :NEW.data_nastere, :NEW.nota);
                END IF;

                UPDATE CLIENT_IDENTITY@CENTRAL_LINK
                SET nume = :NEW.nume,
                    prenume = :NEW.prenume
                WHERE cod_client = :NEW.cod_client;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO CLIENT_IDENTITY@CENTRAL_LINK (cod_client, nume, prenume)
                    VALUES (:NEW.cod_client, :NEW.nume, :NEW.prenume);
                END IF;

                -- Verifică județul și inserează în tabela corespunzătoare
                IF v_judet_normalizat IN (''Suceava'', ''Botoșani'', ''Iași'', ''Neamț'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Sălaj'', ''Bihor'', ''Cluj'', ''Timiș'', ''Brașov'', ''Arad'', ''Sibiu'', ''Alba'', ''Bacău'', ''Hunedoara'', ''Galați'', ''Harghita'', ''Covasna'', ''Mureș'', ''Vaslui'') THEN
                    UPDATE CLIENT_CONTACT@NORD_LINK
                    SET nr_telefon = :NEW.nr_telefon,
                        apelativ = :NEW.apelativ
                    WHERE cod_client = :NEW.cod_client;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO CLIENT_CONTACT@NORD_LINK (cod_client, nr_telefon, apelativ)
                        VALUES (:NEW.cod_client, :NEW.nr_telefon, :NEW.apelativ);
                    END IF;
                ELSE
                    UPDATE CLIENT_CONTACT@SUD_LINK
                    SET nr_telefon = :NEW.nr_telefon,
                        apelativ = :NEW.apelativ
                    WHERE cod_client = :NEW.cod_client;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO CLIENT_CONTACT@SUD_LINK (cod_client, nr_telefon, apelativ)
                        VALUES (:NEW.cod_client, :NEW.nr_telefon, :NEW.apelativ);
                    END IF;
                END IF;
            END LOOP;

            CLOSE c_judet;

            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update CLIENT '' || :NEW.cod_client, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_client
        AFTER DELETE ON CLIENT
        FOR EACH ROW
        BEGIN
            -- Șterge din toate locațiile
            DELETE FROM CLIENT_PROFIL@ARHIVA_LINK WHERE cod_client = :OLD.cod_client;
            DELETE FROM CLIENT_IDENTITY@CENTRAL_LINK WHERE cod_client = :OLD.cod_client;
            DELETE FROM CLIENT_CONTACT@NORD_LINK WHERE cod_client = :OLD.cod_client;
            DELETE FROM CLIENT_CONTACT@SUD_LINK WHERE cod_client = :OLD.cod_client;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete CLIENT '' || :OLD.cod_client, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGERI CURSA

    -- TRIGGER PENTRU INSERARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_ins_cursa
        AFTER INSERT ON CURSA
        FOR EACH ROW
        DECLARE
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Obține județul din locație
            SELECT judet INTO v_judet
            FROM LOCATII L
            JOIN CURSA C ON L.cod_locatie = C.cod_locatie
            WHERE C.cod_cursa = :NEW.cod_cursa;

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

            -- Sincronizare cu fragmentele orizontale

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') THEN
                INSERT INTO CURSA_NORD@NORD_LINK (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                VALUES (:NEW.cod_cursa, :NEW.cod_masina, :NEW.cod_sofer, :NEW.cod_client, :NEW.adresa_client, :NEW.destinatie, :NEW.cod_locatie);
            ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') THEN
                INSERT INTO CURSA_SUD@SUD_LINK (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                VALUES (:NEW.cod_cursa, :NEW.cod_masina, :NEW.cod_sofer, :NEW.cod_client, :NEW.adresa_client, :NEW.destinatie, :NEW.cod_locatie);
            ELSE
                INSERT INTO CURSA_CENTRAL@CENTRAL_LINK (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                VALUES (:NEW.cod_cursa, :NEW.cod_masina, :NEW.cod_sofer, :NEW.cod_client, :NEW.adresa_client, :NEW.destinatie, :NEW.cod_locatie);
            END IF;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert CURSA '' || :NEW.cod_cursa, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ACTUALIZARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_upd_cursa
            AFTER UPDATE ON CURSA
            FOR EACH ROW
        DECLARE
            CURSOR c_judet IS
                SELECT judet
                FROM LOCATII L
                JOIN CURSA C ON L.cod_locatie = C.cod_locatie
                WHERE C.cod_cursa = :NEW.cod_cursa;
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Deschide cursorul
            OPEN c_judet;
            LOOP
                FETCH c_judet INTO v_judet;
                EXIT WHEN c_judet%NOTFOUND;

                -- Normalizează județul (elimină diacriticele)
                v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

                -- Sincronizare cu fragmentele orizontale

                IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') THEN
                    UPDATE CURSA_NORD@NORD_LINK
                    SET cod_masina = :NEW.cod_masina,
                        cod_sofer = :NEW.cod_sofer,
                        cod_client = :NEW.cod_client,
                        adresa_client = :NEW.adresa_client,
                        destinatie = :NEW.destinatie,
                        cod_locatie = :NEW.cod_locatie
                    WHERE cod_cursa = :NEW.cod_cursa;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO CURSA_NORD@NORD_LINK (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                        VALUES (:NEW.cod_cursa, :NEW.cod_masina, :NEW.cod_sofer, :NEW.cod_client, :NEW.adresa_client, :NEW.destinatie, :NEW.cod_locatie);
                    END IF;

                ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') THEN
                    UPDATE CURSA_SUD@SUD_LINK
                    SET cod_masina = :NEW.cod_masina,
                        cod_sofer = :NEW.cod_sofer,
                        cod_client = :NEW.cod_client,
                        adresa_client = :NEW.adresa_client,
                        destinatie = :NEW.destinatie,
                        cod_locatie = :NEW.cod_locatie
                    WHERE cod_cursa = :NEW.cod_cursa;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO CURSA_SUD@SUD_LINK (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                        VALUES (:NEW.cod_cursa, :NEW.cod_masina, :NEW.cod_sofer, :NEW.cod_client, :NEW.adresa_client, :NEW.destinatie, :NEW.cod_locatie);
                    END IF;

                ELSE
                    UPDATE CURSA_CENTRAL@CENTRAL_LINK
                    SET cod_masina = :NEW.cod_masina,
                        cod_sofer = :NEW.cod_sofer,
                        cod_client = :NEW.cod_client,
                        adresa_client = :NEW.adresa_client,
                        destinatie = :NEW.destinatie,
                        cod_locatie = :NEW.cod_locatie
                    WHERE cod_cursa = :NEW.cod_cursa;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO CURSA_CENTRAL@CENTRAL_LINK (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                        VALUES (:NEW.cod_cursa, :NEW.cod_masina, :NEW.cod_sofer, :NEW.cod_client, :NEW.adresa_client, :NEW.destinatie, :NEW.cod_locatie);
                    END IF;
                END IF;
            END LOOP;

            CLOSE c_judet;

            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update CURSA '' || :NEW.cod_cursa, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_cursa
        AFTER DELETE ON CURSA
        FOR EACH ROW
        BEGIN
            -- Șterge din toate locațiile
            DELETE FROM CURSA_NORD@NORD_LINK WHERE cod_cursa = :OLD.cod_cursa;
            DELETE FROM CURSA_SUD@SUD_LINK WHERE cod_cursa = :OLD.cod_cursa;
            DELETE FROM CURSA_CENTRAL@CENTRAL_LINK WHERE cod_cursa = :OLD.cod_cursa;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete CURSA '' || :OLD.cod_cursa, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGERI DETALII_CURSA

    -- TRIGGER PENTRU INSERARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_ins_detalii_cursa
        AFTER INSERT ON DETALII_CURSA
        FOR EACH ROW
        DECLARE
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Obține județul din locație
            SELECT judet INTO v_judet
            FROM LOCATII L
            JOIN CURSA C ON L.cod_locatie = C.cod_locatie
            JOIN DETALII_CURSA DC ON DC.cod_cursa = C.cod_cursa
            WHERE DC.cod_cursa = :NEW.cod_cursa;

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

            -- Sincronizare cu fragmentele orizontale

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') THEN
                INSERT INTO DETALII_CURSA_NORD@NORD_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
            ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') THEN
                INSERT INTO DETALII_CURSA_SUD@SUD_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
            ELSE
                INSERT INTO DETALII_CURSA_CENTRAL@CENTRAL_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
            END IF;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert DETALII_ URSA '' || :NEW.cod_cursa, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ACTUALIZARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_upd_detalii_cursa
            AFTER UPDATE ON DETALII_CURSA
            FOR EACH ROW
        DECLARE
            CURSOR c_judet IS
                SELECT judet
                FROM LOCATII L
                JOIN CURSA C ON L.cod_locatie = C.cod_locatie
                JOIN DETALII_CURSA DC ON DC.cod_cursa = C.cod_cursa
                WHERE DC.cod_cursa = :NEW.cod_cursa;
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);
        BEGIN
            -- Deschide cursorul
            OPEN c_judet;
            LOOP
                FETCH c_judet INTO v_judet;
                EXIT WHEN c_judet%NOTFOUND;

                -- Normalizează județul (elimină diacriticele)
                v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaisti'');

                -- Sincronizare cu fragmentele orizontale

                IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') THEN
                    UPDATE DETALII_CURSA_NORD@NORD_LINK
                    SET data_cursa = :NEW.data_cursa,
                        nota_sofer = :NEW.nota_sofer,
                        nota_client = :NEW.nota_client
                    WHERE cod_cursa = :NEW.cod_cursa;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO DETALII_CURSA_NORD@NORD_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                        VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
                    END IF;

                ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') THEN
                    UPDATE DETALII_CURSA_SUD@SUD_LINK
                    SET data_cursa = :NEW.data_cursa,
                        nota_sofer = :NEW.nota_sofer,
                        nota_client = :NEW.nota_client
                    WHERE cod_cursa = :NEW.cod_cursa;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO DETALII_CURSA_SUD@SUD_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                        VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
                    END IF;

                ELSE
                    UPDATE DETALII_CURSA_CENTRAL@CENTRAL_LINK
                    SET data_cursa = :NEW.data_cursa,
                        nota_sofer = :NEW.nota_sofer,
                        nota_client = :NEW.nota_client
                    WHERE cod_cursa = :NEW.cod_cursa;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO DETALII_CURSA_CENTRAL@CENTRAL_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                        VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
                    END IF;
                END IF;
            END LOOP;

            CLOSE c_judet;

            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update DETALII CURSA '' || :NEW.cod_cursa, ''I'', ''Admin'', SYSDATE);
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_detalii_cursa
        AFTER DELETE ON DETALII_CURSA
        FOR EACH ROW
        BEGIN
            -- Șterge din toate locațiile
            DELETE FROM DETALII_CURSA_NORD@NORD_LINK WHERE cod_cursa = :OLD.cod_cursa;
            DELETE FROM DETALII_CURSA_SUD@SUD_LINK WHERE cod_cursa = :OLD.cod_cursa;
            DELETE FROM DETALII_CURSA_CENTRAL@CENTRAL_LINK WHERE cod_cursa = :OLD.cod_cursa;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete DETALII CURSA '' || :OLD.cod_cursa, ''I'', ''Admin'', SYSDATE);
        END;
    ';
END;
