const express = require("express");
const router = express.Router();
const { createAngajatIdentity, getAllAngajatIdentity, getAngajatIdentityById, updateAngajatIdentity, deleteAngajatIdentity } = require("../../controllers/central/angajatIdentityController");

/**
 * @swagger
 * tags:
 *   name: CENTRAL - Angajati
 *   description: API pentru gestionarea angajaților
 */

/**
 * @swagger
 * /api/central/angajatIdentity:
 *   post:
 *     summary: Creează un angajatIdentity
 *     description: Adaugă un nou angajatIdentity în baza de date.
 *     tags: [CENTRAL - Angajati]
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
 *     responses:
 *       201:
 *         description: AngajatIdentity creat cu succes.
 *       500:
 *         description: Eroare la crearea angajatIdentity-ului.
 */
router.post("/", createAngajatIdentity);

/**
 * @swagger
 * /api/central/angajatIdentity:
 *   get:
 *     summary: Preia toți angajații
 *     description: Returnează lista completă a angajaților din baza de date.
 *     tags: [CENTRAL - Angajati]
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
 *       500:
 *         description: Eroare la preluarea angajaților.
 */
router.get("/", getAllAngajatIdentity);

/**
 * @swagger
 * /api/central/angajatIdentity/{id}:
 *   get:
 *     summary: Preia un angajatIdentity după ID
 *     description: Returnează datele unui angajatIdentity specificat prin ID.
 *     tags: [CENTRAL - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatIdentity-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: AngajatIdentity găsit.
 *       404:
 *         description: AngajatIdentity-ul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea angajatIdentity-ului.
 */
router.get("/:id", getAngajatIdentityById);

/**
 * @swagger
 * /api/central/angajatIdentity/{id}:
 *   put:
 *     summary: Actualizează un angajatIdentity
 *     description: Actualizează datele unui angajatIdentity specificat prin ID.
 *     tags: [CENTRAL - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatIdentity-ului.
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
 *     responses:
 *       200:
 *         description: AngajatIdentity actualizat cu succes.
 *       404:
 *         description: AngajatIdentity-ul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea angajatIdentity-ului.
 */
router.put("/:id", updateAngajatIdentity);

/**
 * @swagger
 * /api/central/angajatIdentity/{id}:
 *   delete:
 *     summary: Șterge un angajatIdentity
 *     description: Șterge un angajatIdentity specificat prin ID din baza de date.
 *     tags: [CENTRAL - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatIdentityului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: AngajatIdentity șters cu succes.
 *       404:
 *         description: AngajatIdentity-ul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea angajatIdentity-ului.
 */
router.delete("/:id", deleteAngajatIdentity);

module.exports = router;