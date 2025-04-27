const express = require("express");
const router = express.Router();
const { createAngajat, getAllAngajati, getAngajatById, updateAngajat, deleteAngajat } = require("../../controllers/warehouse/dimAngajatController");

/**
 * @swagger
 * tags:
 *   name: Warehouse - Angajat
 *   description: API pentru gestionarea angajaților
 */

/**
 * @swagger
 * /api/warehouse/dimAngajat:
 *   post:
 *     summary: Creează un angajat
 *     description: Adaugă un nou angajat în baza de date.
 *     tags: [Warehouse - Angajat]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume_angajat:
 *                 type: string
 *                 example: "Ion Popescu"
 *               tip_angajat:
 *                 type: string
 *                 example: "Permanent"
 *               data_angajare:
 *                 type: string
 *                 format: date
 *                 example: "2023-02-01"
 *               salariu:
 *                 type: number
 *                 format: decimal
 *                 example: 3500.00
 *     responses:
 *       201:
 *         description: Angajat creat cu succes.
 *       500:
 *         description: Eroare la crearea angajatului.
 */
router.post("/", createAngajat);

/**
 * @swagger
 * /api/warehouse/dimAngajat:
 *   get:
 *     summary: Preia toți angajații
 *     description: Returnează lista completă a angajaților din baza de date.
 *     tags: [Warehouse - Angajat]
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
 *                   nume_angajat:
 *                     type: string
 *                     example: "Ion Popescu"
 *                   tip_angajat:
 *                     type: string
 *                     example: "Permanent"
 *                   data_angajare:
 *                     type: string
 *                     format: date
 *                     example: "2023-02-01"
 *                   salariu:
 *                     type: number
 *                     format: decimal
 *                     example: 3500.00
 *       500:
 *         description: Eroare la preluarea angajaților.
 */
router.get("/", getAllAngajati);

/**
 * @swagger
 * /api/warehouse/dimAngajat/{id}:
 *   get:
 *     summary: Preia angajatul după ID
 *     description: Returnează detaliile unui angajat specificat prin ID.
 *     tags: [Warehouse - Angajat]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatului (cod_angajat).
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
router.get("/:id", getAngajatById);

/**
 * @swagger
 * /api/warehouse/dimAngajat/{id}:
 *   put:
 *     summary: Actualizează un angajat
 *     description: Actualizează detaliile unui angajat specificat prin ID.
 *     tags: [Warehouse - Angajat]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatului (cod_angajat).
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
 *               nume_angajat:
 *                 type: string
 *                 example: "Ion Popescu"
 *               tip_angajat:
 *                 type: string
 *                 example: "Permanent"
 *               data_angajare:
 *                 type: string
 *                 format: date
 *                 example: "2023-02-01"
 *               salariu:
 *                 type: number
 *                 format: decimal
 *                 example: 3500.00
 *     responses:
 *       200:
 *         description: Angajat actualizat cu succes.
 *       404:
 *         description: Angajatul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea angajatului.
 */
router.put("/:id", updateAngajat);

/**
 * @swagger
 * /api/warehouse/dimAngajat/{id}:
 *   delete:
 *     summary: Șterge un angajat
 *     description: Șterge un angajat specificat prin ID din baza de date.
 *     tags: [Warehouse - Angajat]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatului (cod_angajat).
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
router.delete("/:id", deleteAngajat);

module.exports = router;