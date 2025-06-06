const express = require("express");
const router = express.Router();
const { createAngajatSud, getAllAngajatiSud, getAngajatSudById, updateAngajatSud, deleteAngajatSud } = require("../../controllers/sud/angajatSudController");

/**
 * @swagger
 * tags:
 *   name: SUD - Angajati
 *   description: API pentru gestionarea angajaților
 */

/**
 * @swagger
 * /api/sud/angajatSud:
 *   post:
 *     summary: Creează un angajat
 *     description: Adaugă un nou angajat în baza de date.
 *     tags: [SUD - Angajati]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume:
 *                 type: string
 *                 example: Ion
 *               prenume:
 *                 type: string
 *                 example: Popescu
 *               nr_telefon:
 *                 type: string
 *                 example: 0712345678
 *               tip_angajat:
 *                 type: string
 *                 example: Sofer
 *               data_nastere:
 *                 type: string
 *                 format: date
 *                 example: "1985-06-15"
 *               data_angajare:
 *                 type: string
 *                 format: date
 *                 example: "2020-01-10"
 *               salariu:
 *                 type: integer
 *                 example: 4500
 *               cod_masina:
 *                 type: integer
 *                 example: 12345
 *     responses:
 *       201:
 *         description: Angajat creat cu succes.
 *       500:
 *         description: Eroare la crearea angajatului.
 */
router.post("/", createAngajatSud);

/**
 * @swagger
 * /api/sud/angajatSud:
 *   get:
 *     summary: Preia toți angajații
 *     description: Returnează lista completă a angajaților din baza de date.
 *     tags: [SUD - Angajati]
 *     responses:
 *       200:
 *         description: Lista angajaților.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cod_angajat:
 *                     type: integer
 *                     example: 1
 *                   nume:
 *                     type: string
 *                     example: Ion
 *                   prenume:
 *                     type: string
 *                     example: Popescu
 *                   nr_telefon:
 *                     type: string
 *                     example: 0712345678
 *                   tip_angajat:
 *                     type: string
 *                     example: Sofer
 *                   data_nastere:
 *                     type: string
 *                     format: date
 *                     example: "1985-06-15"
 *                   data_angajare:
 *                     type: string
 *                     format: date
 *                     example: "2020-01-10"
 *                   salariu:
 *                     type: integer
 *                     example: 4500
 *                   cod_masina:
 *                     type: integer
 *                     example: 12345
 *       500:
 *         description: Eroare la preluarea angajaților.
 */
router.get("/", getAllAngajatiSud);

/**
 * @swagger
 * /api/sud/angajatSud/{id}:
 *   get:
 *     summary: Preia un angajat după ID
 *     description: Returnează datele unui angajat specificat prin ID.
 *     tags: [SUD - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Angajat găsit.
 *       404:
 *         description: Angajatul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea angajatului.
 */
router.get("/:id", getAngajatSudById);

/**
 * @swagger
 * /api/sud/angajatSud/{id}:
 *   put:
 *     summary: Actualizează un angajat
 *     description: Actualizează datele unui angajat specificat prin ID.
 *     tags: [SUD - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatului.
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume:
 *                 type: string
 *                 example: Ion
 *               prenume:
 *                 type: string
 *                 example: Popescu
 *               nr_telefon:
 *                 type: string
 *                 example: 0712345678
 *               tip_angajat:
 *                 type: string
 *                 example: Sofer
 *               data_nastere:
 *                 type: string
 *                 format: date
 *                 example: "1985-06-15"
 *               data_angajare:
 *                 type: string
 *                 format: date
 *                 example: "2020-01-10"
 *               salariu:
 *                 type: integer
 *                 example: 5000
 *               cod_masina:
 *                 type: integer
 *                 example: 12345
 *     responses:
 *       200:
 *         description: Angajat actualizat cu succes.
 *       404:
 *         description: Angajatul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea angajatului.
 */
router.put("/:id", updateAngajatSud);

/**
 * @swagger
 * /api/sud/angajatSud/{id}:
 *   delete:
 *     summary: Șterge un angajat
 *     description: Șterge un angajat specificat prin ID din baza de date.
 *     tags: [SUD - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Angajat șters cu succes.
 *       404:
 *         description: Angajatul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea angajatului.
 */
router.delete("/:id", deleteAngajatSud);

module.exports = router;