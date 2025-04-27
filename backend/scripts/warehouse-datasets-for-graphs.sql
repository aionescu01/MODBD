-- 10

--1
SELECT 
    A.Nume_angajat AS Sofer,
    AVG(F.Nota_Client) AS Media_Note,
    COUNT(F.Cod_Cursa) AS Numar_Curse
FROM 
    F_Cursa F
JOIN 
    Dim_Angajat A ON F.Cod_Angajat = A.Cod_Angajat
GROUP BY 
    A.Nume_angajat;
    
--2
SELECT 
    L.Judet AS Locatie,
    SUM(F.Pret) AS Venit_Total
FROM 
    F_Cursa c
JOIN 
    Dim_Locatie L ON c.Cod_Locatie = L.Cod_Locatie
JOIN Dim_timp t ON t.cod_timp=c.cod_timp
JOIN Dim_factura f ON f.cod_factura = c.cod_factura
WHERE 
    t.data >= ADD_MONTHS(SYSDATE, -6)
GROUP BY 
    L.Judet
HAVING 
    SUM(F.Pret) > 100;
    
--3
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
JOIN dim_timp t ON c.cod_timp=t.cod_timp
WHERE 
    t.data >= ADD_MONTHS(SYSDATE, -1) 
    --t.data >= SYSDATE - 30 
GROUP BY
    a.cod_angajat, a.nume_angajat
--HAVING SUM(f.pret) > 200  -- Afișează doar șoferii cu venituri mai mari de 200 RON
ORDER BY
    venit_total DESC;

--4
SELECT 
    TO_CHAR(t.data, 'YYYY-MM') AS Luna,
    COUNT(F.Cod_Cursa) AS Numar_Curse
FROM 
    F_Cursa F
JOIN dim_timp t ON f.cod_timp=t.cod_timp
GROUP BY 
    TO_CHAR(t.data, 'YYYY-MM');
    
--5
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
    END;