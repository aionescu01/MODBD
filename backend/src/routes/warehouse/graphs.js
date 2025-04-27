const express = require("express");
const { sequelizeOLTP, sequelizeWarehouse } = require("../../config/database");
const router = express.Router();


router.get("/ex10/:id", async (req, res) => {
    const reportId = req.params.id;
    
    let query = '';
    let mesaj = '';
    
    try {
        switch (reportId) {
            case '1':
                query = `
                    SELECT 
                        A.Nume_angajat AS Sofer,
                        AVG(F.Nota_Client) AS Media_Note,
                        COUNT(F.Cod_Cursa) AS Numar_Curse
                    FROM 
                        F_Cursa F
                    JOIN 
                        Dim_Angajat A ON F.Cod_Angajat = A.Cod_Angajat
                    GROUP BY 
                        A.Nume_angajat
                `;
                mesaj = '1. Performanta soferilor';
                break;
                
            case '2':
                query = `
                    SELECT 
                        L.Judet AS Locatie,
                        SUM(F.Pret) AS Venit_Total
                    FROM 
                        F_Cursa c
                    JOIN 
                        Dim_Locatie L ON c.Cod_Locatie = L.Cod_Locatie
                    JOIN 
                        Dim_timp t ON t.cod_timp = c.cod_timp
                    JOIN 
                        Dim_factura f ON f.cod_factura = c.cod_factura
                    WHERE 
                        t.data >= ADD_MONTHS(SYSDATE, -6)
                    GROUP BY 
                        L.Judet
                    HAVING 
                        SUM(F.Pret) > 100
                `;
                mesaj = '2. Venituri per locatie';
                break;
                
            case '3':
                query = `
                    SELECT
                        a.cod_angajat,
                        a.nume_angajat,
                        SUM(f.pret) AS venit_total,
                        COUNT(c.cod_cursa) AS numar_total_curse
                    FROM
                        f_cursa c
                    JOIN
                        dim_angajat a ON a.cod_angajat = c.cod_angajat
                    JOIN
                        dim_factura f ON c.cod_factura = f.cod_factura
                    JOIN 
                        dim_timp t ON c.cod_timp = t.cod_timp
                    WHERE 
                        t.data >= ADD_MONTHS(SYSDATE, -1)
                    GROUP BY
                        a.cod_angajat, a.nume_angajat
                    ORDER BY
                        venit_total DESC
                `;
                mesaj = '3. Performanta financiara a soferilor';
                break;
                
            case '4':
                query = `
                    SELECT 
                        TO_CHAR(t.data, 'YYYY-MM') AS Luna,
                        COUNT(F.Cod_Cursa) AS Numar_Curse
                    FROM 
                        F_Cursa F
                    JOIN 
                        dim_timp t ON f.cod_timp = t.cod_timp
                    GROUP BY 
                        TO_CHAR(t.data, 'YYYY-MM')
                `;
                mesaj = '4. Utilizarea flotei de vehicule';
                break;
                
            case '5':
                query = `
                    SELECT 
                        CASE
                            WHEN F.Nota_Client BETWEEN 0 AND 4.9 THEN '<5'
                            WHEN F.Nota_Client BETWEEN 5 AND 6.9 THEN '5-7'
                            WHEN F.Nota_Client BETWEEN 7 AND 8.9 THEN '7-9'
                            WHEN F.Nota_Client BETWEEN 9 AND 10 THEN '9-10'
                        END AS Interval_Note,
                        COUNT(F.Nota_Client) AS Numar_Recenzii
                    FROM 
                        F_Cursa F
                    GROUP BY 
                        CASE
                            WHEN F.Nota_Client BETWEEN 0 AND 4.9 THEN '<5'
                            WHEN F.Nota_Client BETWEEN 5 AND 6.9 THEN '5-7'
                            WHEN F.Nota_Client BETWEEN 7 AND 8.9 THEN '7-9'
                            WHEN F.Nota_Client BETWEEN 9 AND 10 THEN '9-10'
                        END
                `;
                mesaj = '5. Evaluarea satisfactiei clientilor';
                break;

            default:
                return res.status(400).json({ message: 'Invalid report ID' });
        }

        const result = await sequelizeWarehouse.query(query);

        await sequelizeOLTP.models.Mesaj.create({
            MESSAGE: `Generare ${mesaj} realizata cu succes!`,
            MESSAGE_TYPE: "I",
            CREATED_BY: "Admin",
            CREATED_AT: new Date(),
        });

        res.json(result[0]);
    } catch (error) {
        await sequelizeOLTP.models.Mesaj.create({
            MESSAGE: `Eroare la generarea ${error}`,
            MESSAGE_TYPE: "E",
            CREATED_BY: "Admin",
            CREATED_AT: new Date(),
        });

        res.status(500).json({ message: 'Error executing query', error: error.message });
    }
});

module.exports = router;