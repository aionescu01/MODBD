const express = require("express");
const router = express.Router();
const { createAngajatHR, getAllAngajatiHR, getAngajatHRById, updateAngajatHR, deleteAngajatHR } = require("../../controllers/arhiva/angajatHRController");

/**
 * @swagger
 * tags:
 *   name: ARHIVA - Angajati
 *   description: API pentru gestionarea angajaților
 */

/**
 * @swagger
 * /api/arhiva/angajatHR:
 *   post:
 *     summary: Creează un angajathr
 *     description: Adaugă un nou angajathr în baza de date.
 *     tags: [ARHIVA - Angajati]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
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
 *         description: AngajatHR creat cu succes.
 *       500:
 *         description: Eroare la crearea angajathr-ului.
 */
router.post("/", createAngajatHR);

/**
 * @swagger
 * /api/arhiva/angajatHR:
 *   get:
 *     summary: Preia toți angajații
 *     description: Returnează lista completă a angajaților din baza de date.
 *     tags: [ARHIVA - Angajati]
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
router.get("/", getAllAngajatiHR);

/**
 * @swagger
 * /api/arhiva/angajatHR/{id}:
 *   get:
 *     summary: Preia un angajathr după ID
 *     description: Returnează datele unui angajathr specificat prin ID.
 *     tags: [ARHIVA - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajathr-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: AngajatHR găsit.
 *       404:
 *         description: AngajatHR-ul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea angajathr-ului.
 */
router.get("/:id", getAngajatHRById);

/**
 * @swagger
 * /api/arhiva/angajatHR/{id}:
 *   put:
 *     summary: Actualizează un angajathr
 *     description: Actualizează datele unui angajathr specificat prin ID.
 *     tags: [ARHIVA - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajathr-ului.
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
 *         description: AngajatHR actualizat cu succes.
 *       404:
 *         description: AngajatHR-ul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea angajathr-ului.
 */
router.put("/:id", updateAngajatHR);

/**
 * @swagger
 * /api/arhiva/angajatHR/{id}:
 *   delete:
 *     summary: Șterge un angajathr
 *     description: Șterge un angajathr specificat prin ID din baza de date.
 *     tags: [ARHIVA - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajathr-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: AngajatHR șters cu succes.
 *       404:
 *         description: AngajatHR-ul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea angajathr-ului.
 */
router.delete("/:id", deleteAngajatHR);

module.exports = router;