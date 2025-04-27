DECLARE
    table_count NUMBER;
    view_count NUMBER;
BEGIN
    --6.
    SELECT COUNT(*) INTO table_count 
    FROM user_tables 
    WHERE table_name = 'F_CURSA';

    IF table_count > 0 THEN
        BEGIN
            BEGIN
                EXECUTE IMMEDIATE 'DROP INDEX IDX_F_Cursa_CodTimp';
            EXCEPTION
                WHEN OTHERS THEN
                    IF SQLCODE != -1418 THEN
                        RAISE;
                    END IF;
            END;
            EXECUTE IMMEDIATE 'CREATE INDEX IDX_F_Cursa_CodTimp ON F_Cursa (cod_timp)';
            
            BEGIN
                EXECUTE IMMEDIATE 'DROP INDEX bitmap_index_cursa_cod_angajat';
            EXCEPTION
                WHEN OTHERS THEN
                    IF SQLCODE != -1418 THEN
                        RAISE;
                    END IF;
            END;
            EXECUTE IMMEDIATE 'CREATE BITMAP INDEX bitmap_index_cursa_cod_angajat ON F_Cursa(cod_angajat) LOCAL';
        END;
    END IF;

    --9.
    SELECT COUNT(*) INTO view_count 
    FROM sys.all_mviews 
    WHERE mview_name = 'VM_VENITURI_SOFER_LUNA';

    IF view_count = 0 THEN
        EXECUTE IMMEDIATE '
        CREATE MATERIALIZED VIEW vm_venituri_sofer_luna
        ENABLE QUERY REWRITE
        AS
        SELECT dim_angajat.Cod_Angajat,
               TO_CHAR(dim_timp.data, ''YYYY-MM'') AS Luna,
               SUM(dim_factura.Pret) AS Venit_Total,
               dim_angajat.nume_angajat AS Nume
        FROM F_Cursa
        JOIN dim_angajat ON F_Cursa.Cod_angajat = dim_angajat.Cod_Angajat
        JOIN dim_timp ON dim_timp.cod_timp = F_Cursa.cod_timp
        JOIN dim_factura ON dim_factura.cod_factura = F_Cursa.cod_factura
        GROUP BY dim_angajat.Cod_Angajat, dim_angajat.nume_angajat, TO_CHAR(dim_timp.data, ''YYYY-MM'')
        ';

        EXECUTE IMMEDIATE 'CREATE INDEX idx_vm_luna_angajat ON vm_venituri_sofer_luna (Cod_Angajat)';
    END IF;
END;