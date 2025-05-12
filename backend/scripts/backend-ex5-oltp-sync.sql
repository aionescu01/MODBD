-- 5.Asigurarea sincronizării datelor pentru relațiile replicate

BEGIN
    EXECUTE IMMEDIATE'
        CREATE OR REPLACE PACKAGE pkg_sync_ctx AS
            PROCEDURE start_sync;
            PROCEDURE end_sync;
            FUNCTION is_sync RETURN BOOLEAN;

            PROCEDURE start_sync_for(p_operation VARCHAR2, p_entity VARCHAR2, p_id VARCHAR2);
            FUNCTION is_sync_for(p_operation VARCHAR2, p_entity VARCHAR2, p_id VARCHAR2) RETURN BOOLEAN;

            PROCEDURE set_initiator(p_initiator VARCHAR2);
            FUNCTION get_initiator RETURN VARCHAR2;
        END;
    ';

    EXECUTE IMMEDIATE'
        CREATE OR REPLACE PACKAGE BODY pkg_sync_ctx AS
            g_initiator VARCHAR2(10) := '''';

            PROCEDURE start_sync IS
            BEGIN
                DBMS_SESSION.set_context(''sync_ctx'', ''is_sync'', ''1'');
            END;

            PROCEDURE end_sync IS
            BEGIN
                DBMS_SESSION.set_context(''sync_ctx'', ''is_sync'', ''0'');
            END;

            FUNCTION is_sync RETURN BOOLEAN IS
            BEGIN
                RETURN SYS_CONTEXT(''sync_ctx'', ''is_sync'') = ''1'';
            END;

            PROCEDURE start_sync_for(p_operation VARCHAR2, p_entity VARCHAR2, p_id VARCHAR2) IS
                v_key VARCHAR2(200);
            BEGIN
                v_key := p_operation || ''_'' || p_entity || ''_'' || p_id;
                DBMS_SESSION.set_context(''sync_ctx'', v_key, ''1'');
            END;

            FUNCTION is_sync_for(p_operation VARCHAR2, p_entity VARCHAR2, p_id VARCHAR2) RETURN BOOLEAN IS
                v_key VARCHAR2(200);
            BEGIN
                v_key := p_operation || ''_'' || p_entity || ''_'' || p_id;
                RETURN SYS_CONTEXT(''sync_ctx'', v_key) = ''1'' OR SYS_CONTEXT(''sync_ctx'', ''is_sync'') = ''1'';
            END;

            PROCEDURE set_initiator(p_initiator VARCHAR2) IS
            BEGIN
                g_initiator := p_initiator;
            END set_initiator;
            
            FUNCTION get_initiator RETURN VARCHAR2 IS
            BEGIN
                RETURN g_initiator;
            END get_initiator;
        END;
    ';

    EXECUTE IMMEDIATE '
        BEGIN
            EXECUTE IMMEDIATE ''CREATE CONTEXT sync_ctx USING pkg_sync_ctx'';
        EXCEPTION
            WHEN OTHERS THEN
                IF SQLCODE = -955 THEN
                    NULL;
                ELSE
                    RAISE;
                END IF;
        END;
    ';

    -- TRIGGERI LOCATII

    -- TRIGGER PENTRU INSERARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_ins_locatie
        AFTER INSERT ON LOCATII
        FOR EACH ROW
        DECLARE
            v_judet_normalizat VARCHAR2(100);

            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''INSERT'', ''LOCATIE'', :NEW.cod_locatie) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''INSERT'', ''LOCATIE'', :NEW.cod_locatie);

            v_init := pkg_sync_ctx.get_initiator();

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(:NEW.judet, ''ăâîșțâ'', ''aaista'');

            -- Sincronizare cu fragmentele orizontale

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                
                INSERT INTO LOCATII_NORD@NORD_LINK (cod_locatie, localitate, judet)
                VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
            
            ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') AND NVL(v_init, ''NONE'') <> ''SUD'' THEN
                
                INSERT INTO LOCATII_SUD@SUD_LINK (cod_locatie, localitate, judet)
                VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
            
            ELSIF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN
                
                INSERT INTO LOCATII_CENTRAL@CENTRAL_LINK (cod_locatie, localitate, judet)
                VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
            
            END IF;

            pkg_sync_ctx.end_sync;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert LOCATIE '' || :NEW.cod_locatie, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
        END;
    ';

    -- TRIGGER PENTRU ACTUALIZARE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_upd_locatie
            AFTER UPDATE ON LOCATII
            FOR EACH ROW
        DECLARE
            v_judet_normalizat VARCHAR2(100);

            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''UPDATE'', ''LOCATIE'', :NEW.cod_locatie) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''UPDATE'', ''LOCATIE'', :NEW.cod_locatie);

            v_init := pkg_sync_ctx.get_initiator();

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(:NEW.judet, ''ăâîșțâ'', ''aaista'');

            -- Sincronizare cu fragmentele orizontale

            IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                
                UPDATE LOCATII_NORD@NORD_LINK
                SET localitate = :NEW.localitate,
                    judet = :NEW.judet
                WHERE cod_locatie = :NEW.cod_locatie;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO LOCATII_NORD@NORD_LINK (cod_locatie, localitate, judet)
                    VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
                END IF;

            ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') AND NVL(v_init, ''NONE'') <> ''SUD'' THEN
                
                UPDATE LOCATII_SUD@SUD_LINK
                SET localitate = :NEW.localitate,
                    judet = :NEW.judet
                WHERE cod_locatie = :NEW.cod_locatie;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO LOCATII_SUD@SUD_LINK (cod_locatie, localitate, judet)
                    VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
                END IF;

            ELSIF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN

                UPDATE LOCATII_CENTRAL@CENTRAL_LINK
                SET localitate = :NEW.localitate,
                    judet = :NEW.judet
                WHERE cod_locatie = :NEW.cod_locatie;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO LOCATII_CENTRAL@CENTRAL_LINK (cod_locatie, localitate, judet)
                    VALUES (:NEW.cod_locatie, :NEW.localitate, :NEW.judet);
                END IF;

            END IF;

            pkg_sync_ctx.end_sync;

            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update LOCATIE '' || :NEW.cod_locatie, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_locatie
        AFTER DELETE ON LOCATII
        FOR EACH ROW
        DECLARE
            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''DELETE'', ''LOCATIE'', :OLD.cod_locatie) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''DELETE'', ''LOCATIE'', :OLD.cod_locatie);

            v_init := pkg_sync_ctx.get_initiator();

            -- Șterge din toate locațiile
            IF NVL(v_init, ''NONE'') <> ''NORD'' THEN

                DELETE FROM LOCATII_NORD@NORD_LINK WHERE cod_locatie = :OLD.cod_locatie;
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''SUD'' THEN
            
                DELETE FROM LOCATII_SUD@SUD_LINK WHERE cod_locatie = :OLD.cod_locatie;
            
            END IF;
            
            IF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN
            
                DELETE FROM LOCATII_CENTRAL@CENTRAL_LINK WHERE cod_locatie = :OLD.cod_locatie;
            
            END IF;

            pkg_sync_ctx.end_sync;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete LOCATIE '' || :OLD.cod_locatie, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
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
            
            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''INSERT'', ''ANGAJAT'', :NEW.cod_angajat) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''INSERT'', ''ANGAJAT'', :NEW.cod_angajat);

            v_init := pkg_sync_ctx.get_initiator();

            -- Obține județul din locație
            SELECT judet INTO v_judet
            FROM LOCATII L
            JOIN LUCREAZA_IN LI ON L.cod_locatie = LI.cod_locatie
            WHERE LI.cod_angajat = :NEW.cod_angajat;

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaista'');

            -- Sincronizare cu fragmentele orizontale

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
            
                INSERT INTO ANGAJAT_NORD@NORD_LINK (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume, :NEW.nr_telefon, :NEW.tip_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
            
            ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') AND NVL(v_init, ''NONE'') <> ''SUD'' THEN
            
                INSERT INTO ANGAJAT_SUD@SUD_LINK (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume, :NEW.nr_telefon, :NEW.tip_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
            
            ELSIF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN

                INSERT INTO ANGAJAT_CENTRAL@CENTRAL_LINK (cod_angajat, nume, prenume, nr_telefon, tip_angajat, data_nastere, data_angajare, salariu, cod_masina)
                VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume, :NEW.nr_telefon, :NEW.tip_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
            
            END IF;

            -- Sincronizare cu fragmentele verticale

            IF NVL(v_init, ''NONE'') <> ''ARHIVA'' THEN

                INSERT INTO ANGAJAT_HR@ARHIVA_LINK (cod_angajat, data_nastere, data_angajare, salariu, cod_masina)
                VALUES (:NEW.cod_angajat, :NEW.data_nastere, :NEW.data_angajare, :NEW.salariu, :NEW.cod_masina);
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN

                INSERT INTO ANGAJAT_IDENTITY@CENTRAL_LINK (cod_angajat, nume, prenume)
                VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume);
            
            END IF;

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Suceava'', ''Botoșani'', ''Iași'', ''Neamț'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Sălaj'', ''Bihor'', ''Cluj'', ''Timiș'', ''Brașov'', ''Arad'', ''Sibiu'', ''Alba'', ''Bacău'', ''Hunedoara'', ''Galați'', ''Harghita'', ''Covasna'', ''Mureș'', ''Vaslui'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                
                INSERT INTO ANGAJAT_CONTACT@NORD_LINK (cod_angajat, nr_telefon, tip_angajat)
                VALUES (:NEW.cod_angajat, :NEW.nr_telefon, :NEW.tip_angajat);
            
            ELSIF NVL(v_init, ''NONE'') <> ''SUD'' THEN
                
                INSERT INTO ANGAJAT_CONTACT@SUD_LINK (cod_angajat, nr_telefon, tip_angajat)
                VALUES (:NEW.cod_angajat, :NEW.nr_telefon, :NEW.tip_angajat);
            
            END IF;

            pkg_sync_ctx.end_sync;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert ANGAJAT '' || :NEW.cod_angajat, ''I'', ''Admin'', SYSDATE);
            
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
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
            
            v_init VARCHAR2(10) := '''';
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''UPDATE'', ''ANGAJAT'', :NEW.cod_angajat) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''UPDATE'', ''ANGAJAT'', :NEW.cod_angajat);

            v_init := pkg_sync_ctx.get_initiator();

            -- Sincronizare cu fragmentele verticale

            IF NVL(v_init, ''NONE'') <> ''ARHIVA'' THEN

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
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN

                UPDATE ANGAJAT_IDENTITY@CENTRAL_LINK
                SET nume = :NEW.nume,
                    prenume = :NEW.prenume
                WHERE cod_angajat = :NEW.cod_angajat;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO ANGAJAT_IDENTITY@CENTRAL_LINK (cod_angajat, nume, prenume)
                    VALUES (:NEW.cod_angajat, :NEW.nume, :NEW.prenume);
                END IF;

            END IF;

            -- Deschide cursorul
            OPEN c_judet;
            LOOP
                FETCH c_judet INTO v_judet;
                EXIT WHEN c_judet%NOTFOUND;

                -- Normalizează județul (elimină diacriticele)
                v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaista'');

                -- Sincronizare cu fragmentele orizontale

                IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                                        
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
                    
                ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') AND NVL(v_init, ''NONE'') <> ''SUD'' THEN
                                        
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
                    
                ELSIF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN

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

                -- Verifică județul și inserează în tabela corespunzătoare
                IF v_judet_normalizat IN (''Suceava'', ''Botoșani'', ''Iași'', ''Neamț'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Sălaj'', ''Bihor'', ''Cluj'', ''Timiș'', ''Brașov'', ''Arad'', ''Sibiu'', ''Alba'', ''Bacău'', ''Hunedoara'', ''Galați'', ''Harghita'', ''Covasna'', ''Mureș'', ''Vaslui'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                                        
                    UPDATE ANGAJAT_CONTACT@NORD_LINK
                    SET nr_telefon = :NEW.nr_telefon,
                        tip_angajat = :NEW.tip_angajat
                    WHERE cod_angajat = :NEW.cod_angajat;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO ANGAJAT_CONTACT@NORD_LINK (cod_angajat, nr_telefon, tip_angajat)
                        VALUES (:NEW.cod_angajat, :NEW.nr_telefon, :NEW.tip_angajat);
                    END IF;
                                    
                ELSIF NVL(v_init, ''NONE'') <> ''SUD'' THEN
                    
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

            pkg_sync_ctx.end_sync;

            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update ANGAJAT '' || :NEW.cod_angajat, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_angajat
        AFTER DELETE ON ANGAJAT
        FOR EACH ROW
        DECLARE
            v_init VARCHAR2(10) := '''';
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''DELETE'', ''ANGAJAT'', :NEW.cod_angajat) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''DELETE'', ''ANGAJAT'', :NEW.cod_angajat);

            v_init := pkg_sync_ctx.get_initiator();

            -- Șterge din toate locațiile
            IF NVL(v_init, ''NONE'') <> ''NORD'' THEN
            
                DELETE FROM ANGAJAT_NORD@NORD_LINK WHERE cod_angajat = :OLD.cod_angajat;
                DELETE FROM ANGAJAT_CONTACT@NORD_LINK WHERE cod_angajat = :OLD.cod_angajat;
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''SUD'' THEN

                DELETE FROM ANGAJAT_SUD@SUD_LINK WHERE cod_angajat = :OLD.cod_angajat;
                DELETE FROM ANGAJAT_CONTACT@SUD_LINK WHERE cod_angajat = :OLD.cod_angajat;
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN

                DELETE FROM ANGAJAT_CENTRAL@CENTRAL_LINK WHERE cod_angajat = :OLD.cod_angajat;
                DELETE FROM ANGAJAT_IDENTITY@CENTRAL_LINK WHERE cod_angajat = :OLD.cod_angajat;

            END IF;

            IF NVL(v_init, ''NONE'') <> ''ARHIVA'' THEN

                DELETE FROM ANGAJAT_HR@ARHIVA_LINK WHERE cod_angajat = :OLD.cod_angajat;
            
            END IF;

            pkg_sync_ctx.end_sync;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete ANGAJAT '' || :OLD.cod_angajat, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
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

            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''INSERT'', ''CLIENT'', :NEW.cod_client) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''INSERT'', ''CLIENT'', :NEW.cod_client);

            v_init := pkg_sync_ctx.get_initiator();

            -- Obține județul din locație
            SELECT judet INTO v_judet
            FROM LOCATII L
            JOIN CURSA C ON L.cod_locatie = C.cod_locatie
            WHERE C.cod_client = :NEW.cod_client;

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaista'');

            -- Sincronizare cu fragmentele verticale

            IF NVL(v_init, ''NONE'') <> ''ARHIVA'' THEN

                INSERT INTO CLIENT_PROFIL@ARHIVA_LINK (cod_client, data_nastere, nota)
                VALUES (:NEW.cod_client, :NEW.data_nastere, :NEW.nota);

            END IF;
            
            IF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN

                INSERT INTO CLIENT_IDENTITY@CENTRAL_LINK (cod_client, nume, prenume)
                VALUES (:NEW.cod_client, :NEW.nume, :NEW.prenume);
            
            END IF;

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Suceava'', ''Botoșani'', ''Iași'', ''Neamț'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Sălaj'', ''Bihor'', ''Cluj'', ''Timiș'', ''Brașov'', ''Arad'', ''Sibiu'', ''Alba'', ''Bacău'', ''Hunedoara'', ''Galați'', ''Harghita'', ''Covasna'', ''Mureș'', ''Vaslui'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                
                INSERT INTO CLIENT_CONTACT@NORD_LINK (cod_client, nr_telefon, apelativ)
                VALUES (:NEW.cod_client, :NEW.nr_telefon, :NEW.apelativ);
            
            ELSIF NVL(v_init, ''NONE'') <> ''SUD'' THEN
                
                INSERT INTO CLIENT_CONTACT@SUD_LINK (cod_client, nr_telefon, apelativ)
                VALUES (:NEW.cod_client, :NEW.nr_telefon, :NEW.apelativ);
            
            END IF;

            pkg_sync_ctx.end_sync;
            
            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert CLIENT '' || :NEW.cod_client, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
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

            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''UPDATE'', ''CLIENT'', :NEW.cod_client) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''UPDATE'', ''CLIENT'', :NEW.cod_client);

            v_init := pkg_sync_ctx.get_initiator();

            -- Sincronizare cu fragmentele verticale

            IF NVL(v_init, ''NONE'') <> ''ARHIVA'' THEN
                
                UPDATE CLIENT_PROFIL@ARHIVA_LINK
                SET data_nastere = :NEW.data_nastere,
                    nota = :NEW.nota
                WHERE cod_client = :NEW.cod_client;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO CLIENT_PROFIL@ARHIVA_LINK (cod_client, data_nastere, nota)
                    VALUES (:NEW.cod_client, :NEW.data_nastere, :NEW.nota);
                END IF;
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN

                UPDATE CLIENT_IDENTITY@CENTRAL_LINK
                SET nume = :NEW.nume,
                    prenume = :NEW.prenume
                WHERE cod_client = :NEW.cod_client;

                IF SQL%ROWCOUNT = 0 THEN
                    INSERT INTO CLIENT_IDENTITY@CENTRAL_LINK (cod_client, nume, prenume)
                    VALUES (:NEW.cod_client, :NEW.nume, :NEW.prenume);
                END IF;

            END IF;

            -- Deschide cursorul
            OPEN c_judet;
            LOOP
                FETCH c_judet INTO v_judet;
                EXIT WHEN c_judet%NOTFOUND;

                -- Normalizează județul (elimină diacriticele)
                v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaista'');

                -- Verifică județul și inserează în tabela corespunzătoare
                IF v_judet_normalizat IN (''Suceava'', ''Botoșani'', ''Iași'', ''Neamț'', ''Bistrița-Năsăud'', ''Satu Mare'', ''Maramureș'', ''Sălaj'', ''Bihor'', ''Cluj'', ''Timiș'', ''Brașov'', ''Arad'', ''Sibiu'', ''Alba'', ''Bacău'', ''Hunedoara'', ''Galați'', ''Harghita'', ''Covasna'', ''Mureș'', ''Vaslui'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                    
                    UPDATE CLIENT_CONTACT@NORD_LINK
                    SET nr_telefon = :NEW.nr_telefon,
                        apelativ = :NEW.apelativ
                    WHERE cod_client = :NEW.cod_client;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO CLIENT_CONTACT@NORD_LINK (cod_client, nr_telefon, apelativ)
                        VALUES (:NEW.cod_client, :NEW.nr_telefon, :NEW.apelativ);
                    END IF;
                
                ELSIF NVL(v_init, ''NONE'') <> ''SUD'' THEN
                    
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

            pkg_sync_ctx.end_sync;
            
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update CLIENT '' || :NEW.cod_client, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_client
        AFTER DELETE ON CLIENT
        FOR EACH ROW
        DECLARE
            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''DELETE'', ''CLIENT'', :NEW.cod_client) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''DELETE'', ''CLIENT'', :NEW.cod_client);

            v_init := pkg_sync_ctx.get_initiator();

            -- Șterge din toate locațiile
            IF NVL(v_init, ''NONE'') <> ''ARHIVA'' THEN
            
                DELETE FROM CLIENT_PROFIL@ARHIVA_LINK WHERE cod_client = :OLD.cod_client;
            
            END IF;
            
            IF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN
            
                DELETE FROM CLIENT_IDENTITY@CENTRAL_LINK WHERE cod_client = :OLD.cod_client;
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''NORD'' THEN
            
                DELETE FROM CLIENT_CONTACT@NORD_LINK WHERE cod_client = :OLD.cod_client;
            
            END IF;
            
            IF NVL(v_init, ''NONE'') <> ''ARHIVA'' THEN
            
                DELETE FROM CLIENT_CONTACT@SUD_LINK WHERE cod_client = :OLD.cod_client;

            END IF;

            pkg_sync_ctx.end_sync;
            
            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete CLIENT '' || :OLD.cod_client, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
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

            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''INSERT'', ''CURSA'', :NEW.cod_cursa) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''INSERT'', ''CURSA'', :NEW.cod_cursa);

            v_init := pkg_sync_ctx.get_initiator();

            -- Obține județul din locație
            SELECT judet INTO v_judet
            FROM LOCATII
            WHERE cod_locatie = :NEW.cod_locatie;

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaista'');

            -- Sincronizare cu fragmentele orizontale

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                
                INSERT INTO CURSA_NORD@NORD_LINK (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                VALUES (:NEW.cod_cursa, :NEW.cod_masina, :NEW.cod_sofer, :NEW.cod_client, :NEW.adresa_client, :NEW.destinatie, :NEW.cod_locatie);
            
            ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') AND NVL(v_init, ''NONE'') <> ''SUD'' THEN
                
                INSERT INTO CURSA_SUD@SUD_LINK (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                VALUES (:NEW.cod_cursa, :NEW.cod_masina, :NEW.cod_sofer, :NEW.cod_client, :NEW.adresa_client, :NEW.destinatie, :NEW.cod_locatie);
            
            ELSIF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN
                
                INSERT INTO CURSA_CENTRAL@CENTRAL_LINK (cod_cursa, cod_masina, cod_sofer, cod_client, adresa_client, destinatie, cod_locatie)
                VALUES (:NEW.cod_cursa, :NEW.cod_masina, :NEW.cod_sofer, :NEW.cod_client, :NEW.adresa_client, :NEW.destinatie, :NEW.cod_locatie);
            
            END IF;

            pkg_sync_ctx.end_sync;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert CURSA '' || :NEW.cod_cursa, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
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
                FROM LOCATII
                WHERE cod_locatie = :NEW.cod_locatie;
            
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);

            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''UPDATE'', ''CURSA'', :NEW.cod_cursa) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''UPDATE'', ''CURSA'', :NEW.cod_cursa);

            v_init := pkg_sync_ctx.get_initiator();

            -- Deschide cursorul
            OPEN c_judet;
            LOOP
                FETCH c_judet INTO v_judet;
                EXIT WHEN c_judet%NOTFOUND;

                -- Normalizează județul (elimină diacriticele)
                v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaista'');

                -- Sincronizare cu fragmentele orizontale

                IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                    
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

                ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') AND NVL(v_init, ''NONE'') <> ''SUD'' THEN
                    
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

                ELSIF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN
                    
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

            pkg_sync_ctx.end_sync;
            
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update CURSA '' || :NEW.cod_cursa, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_cursa
        AFTER DELETE ON CURSA
        FOR EACH ROW
        DECLARE
            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''DELETE'', ''CURSA'', :NEW.cod_cursa) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''DELETE'', ''CURSA'', :NEW.cod_cursa);

            v_init := pkg_sync_ctx.get_initiator();

            -- Șterge din toate locațiile
            IF NVL(v_init, ''NONE'') <> ''NORD'' THEN
            
                DELETE FROM CURSA_NORD@NORD_LINK WHERE cod_cursa = :OLD.cod_cursa;
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''SUD'' THEN
            
                DELETE FROM CURSA_SUD@SUD_LINK WHERE cod_cursa = :OLD.cod_cursa;
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN
            
                DELETE FROM CURSA_CENTRAL@CENTRAL_LINK WHERE cod_cursa = :OLD.cod_cursa;
            
            END IF;

            pkg_sync_ctx.end_sync;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete CURSA '' || :OLD.cod_cursa, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
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

            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''INSERT'', ''DETALII_CURSA'', :NEW.cod_cursa) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''INSERT'', ''DETALII_CURSA'', :NEW.cod_cursa);

            v_init := pkg_sync_ctx.get_initiator();

            -- Obține județul din locație
            SELECT judet INTO v_judet
            FROM LOCATII L
            JOIN CURSA C ON L.cod_locatie = C.cod_locatie
            WHERE C.cod_cursa = :NEW.cod_cursa;

            -- Normalizează județul (elimină diacriticele)
            v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaista'');

            -- Sincronizare cu fragmentele orizontale

            -- Verifică județul și inserează în tabela corespunzătoare
            IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                
                INSERT INTO DETALII_CURSA_NORD@NORD_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
            
            ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') AND NVL(v_init, ''NONE'') <> ''SUD'' THEN
                
                INSERT INTO DETALII_CURSA_SUD@SUD_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
            
            ELSIF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN
                
                INSERT INTO DETALII_CURSA_CENTRAL@CENTRAL_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
            
            END IF;

            pkg_sync_ctx.end_sync;
        
            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Insert DETALII_ URSA '' || :NEW.cod_cursa, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
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
                WHERE C.cod_cursa = :NEW.cod_cursa;
            
            v_judet LOCATII.judet%TYPE;
            v_judet_normalizat VARCHAR2(100);

            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''UPDATE'', ''DETALII_CURSA'', :NEW.cod_cursa) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''UPDATE'', ''DETALII_CURSA'', :NEW.cod_cursa);

            v_init := pkg_sync_ctx.get_initiator();

            -- Deschide cursorul
            OPEN c_judet;
            LOOP
                FETCH c_judet INTO v_judet;
                EXIT WHEN c_judet%NOTFOUND;

                -- Normalizează județul (elimină diacriticele)
                v_judet_normalizat := TRANSLATE(v_judet, ''ăâîșțâ'', ''aaista'');

                -- Sincronizare cu fragmentele orizontale

                IF v_judet_normalizat IN (''Botosani'',''Suceava'',''Bistrita-Nasaud'',''Satu Mare'',''Maramures'',''Iasi'',''Neamt'',''Bihor'',''Salaj'') AND NVL(v_init, ''NONE'') <> ''NORD'' THEN
                    
                    UPDATE DETALII_CURSA_NORD@NORD_LINK
                    SET data_cursa = :NEW.data_cursa,
                        nota_sofer = :NEW.nota_sofer,
                        nota_client = :NEW.nota_client
                    WHERE cod_cursa = :NEW.cod_cursa;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO DETALII_CURSA_NORD@NORD_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                        VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
                    END IF;

                ELSIF v_judet_normalizat IN (''Bucuresti'',''Ilfov'',''Dambovita'',''Prahova'',''Arges'',''Giurgiu'',''Teleorman'',''Ialomita'',''Calarasi'',''Braila'',''Vrancea'',''Dolj'',''Olt'',''Mehedinti'',''Gorj'',''Valcea'',''Caras-Severin'',''Constanta'',''Tulcea'',''Buzau'') AND NVL(v_init, ''NONE'') <> ''SUD'' THEN
                    
                    UPDATE DETALII_CURSA_SUD@SUD_LINK
                    SET data_cursa = :NEW.data_cursa,
                        nota_sofer = :NEW.nota_sofer,
                        nota_client = :NEW.nota_client
                    WHERE cod_cursa = :NEW.cod_cursa;

                    IF SQL%ROWCOUNT = 0 THEN
                        INSERT INTO DETALII_CURSA_SUD@SUD_LINK (cod_cursa, data_cursa, nota_sofer, nota_client)
                        VALUES (:NEW.cod_cursa, :NEW.data_cursa, :NEW.nota_sofer, :NEW.nota_client);
                    END IF;

                ELSIF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN
                    
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

            pkg_sync_ctx.end_sync;

            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT)
            VALUES (''Update DETALII CURSA '' || :NEW.cod_cursa, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
        END;
    ';

    -- TRIGGER PENTRU ȘTERGERE
    EXECUTE IMMEDIATE '
        CREATE OR REPLACE TRIGGER trg_del_detalii_cursa
        AFTER DELETE ON DETALII_CURSA
        FOR EACH ROW
        DECLARE
            v_init VARCHAR2(10);
        BEGIN
            IF pkg_sync_ctx.is_sync_for(''DELETE'', ''DETALII_CURSA'', :NEW.cod_cursa) THEN
                RETURN;
            END IF;

            pkg_sync_ctx.start_sync;
            pkg_sync_ctx.start_sync_for(''DELETE'', ''DETALII_CURSA'', :NEW.cod_cursa);

            v_init := pkg_sync_ctx.get_initiator();

            -- Șterge din toate locațiile
            IF NVL(v_init, ''NONE'') <> ''NORD'' THEN
            
                DELETE FROM DETALII_CURSA_NORD@NORD_LINK WHERE cod_cursa = :OLD.cod_cursa;

            END IF;

            IF NVL(v_init, ''NONE'') <> ''SUD'' THEN

                DELETE FROM DETALII_CURSA_SUD@SUD_LINK WHERE cod_cursa = :OLD.cod_cursa;
            
            END IF;

            IF NVL(v_init, ''NONE'') <> ''CENTRAL'' THEN

                DELETE FROM DETALII_CURSA_CENTRAL@CENTRAL_LINK WHERE cod_cursa = :OLD.cod_cursa;
            
            END IF;

            pkg_sync_ctx.end_sync;

            -- Înregistrează mesajul
            INSERT INTO MESAJ@ARHIVA_LINK (MESSAGE, MESSAGE_TYPE, CREATED_BY, CREATED_AT) VALUES (''Delete DETALII CURSA '' || :OLD.cod_cursa, ''I'', ''Admin'', SYSDATE);
        EXCEPTION
            WHEN OTHERS THEN
                pkg_sync_ctx.end_sync;
                RAISE;
        END;
    ';
END;