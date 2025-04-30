const express = require("express");
const router = express.Router();
const { createAngajatNord, getAllAngajatiNord, getAngajatNordById, updateAngajatNord, deleteAngajatNord } = require("../../controllers/nord/angajatNordController");

/**
 * @swagger
 * tags:
 *   name: NORD - Angajati
 *   description: API pentru gestionarea angajaților
 */

/**
 * @swagger
 * /api/nord/angajatNord:
 *   post:
 *     summary: Creează un angajat
 *     description: Adaugă un nou angajat în baza de date.
 *     tags: [NORD - Angajati]
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
router.post("/", createAngajatNord);

/**
 * @swagger
 * /api/nord/angajatNord:
 *   get:
 *     summary: Preia toți angajații
 *     description: Returnează lista completă a angajaților din baza de date.
 *     tags: [NORD - Angajati]
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
router.get("/", getAllAngajatiNord);

/**
 * @swagger
 * /api/nord/angajatNord/{id}:
 *   get:
 *     summary: Preia un angajat după ID
 *     description: Returnează datele unui angajat specificat prin ID.
 *     tags: [NORD - Angajati]
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
router.get("/:id", getAngajatNordById);

/**
 * @swagger
 * /api/nord/angajatNord/{id}:
 *   put:
 *     summary: Actualizează un angajat
 *     description: Actualizează datele unui angajat specificat prin ID.
 *     tags: [NORD - Angajati]
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
router.put("/:id", updateAngajatNord);

/**
 * @swagger
 * /api/nord/angajatNord/{id}:
 *   delete:
 *     summary: Șterge un angajat
 *     description: Șterge un angajat specificat prin ID din baza de date.
 *     tags: [NORD - Angajati]
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
router.delete("/:id", deleteAngajatNord);

module.exports = router;