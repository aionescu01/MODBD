const express = require("express");
const router = express.Router();
const { createAngajatContact, getAllAngajatContact, getAngajatContactById, updateAngajatContact, deleteAngajatContact } = require("../../controllers/nord/angajatContactController");

/**
 * @swagger
 * tags:
 *   name: NORD - Angajati
 *   description: API pentru gestionarea angajaților
 */

/**
 * @swagger
 * /api/nord/angajatContactNord:
 *   post:
 *     summary: Creează un angajatContact
 *     description: Adaugă un nou angajatContact în baza de date.
 *     tags: [NORD - Angajati]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nr_telefon:
 *                 type: string
 *                 example: 0712345678
 *               tip_angajat:
 *                 type: string
 *                 example: Permanent
 *               dispecerat:
 *                 type: string
 *                 example: "Da"
 *     responses:
 *       201:
 *         description: AngajatContact creat cu succes.
 *       500:
 *         description: Eroare la crearea angajatContact-ului.
 */
router.post("/", createAngajatContact);

/**
 * @swagger
 * /api/nord/angajatContactNord:
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
 *                   nr_telefon:
 *                     type: string
 *                     example: 0712345678
 *                   tip_angajat:
 *                     type: string
 *                     example: Permanent
 *                   dispecerat:
 *                     type: string
 *                     example: "Da"
 *       500:
 *         description: Eroare la preluarea angajaților.
 */
router.get("/", getAllAngajatContact);

/**
 * @swagger
 * /api/nord/angajatContactNord/{id}:
 *   get:
 *     summary: Preia un angajatContact după ID
 *     description: Returnează datele unui angajatContact specificat prin ID.
 *     tags: [NORD - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatContact-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: AngajatContact găsit.
 *       404:
 *         description: AngajatContact-ul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea angajatContact-ului.
 */
router.get("/:id", getAngajatContactById);

/**
 * @swagger
 * /api/nord/angajatContactNord/{id}:
 *   put:
 *     summary: Actualizează un angajatContact
 *     description: Actualizează datele unui angajatContact specificat prin ID.
 *     tags: [NORD - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatContact-ului.
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
 *               nr_telefon:
 *                 type: string
 *                 example: 0712345678
 *               tip_angajat:
 *                 type: string
 *                 example: Permanent
 *               dispecerat:
 *                 type: string
 *                 example: "Da"
 *     responses:
 *       200:
 *         description: AngajatContact actualizat cu succes.
 *       404:
 *         description: AngajatContact-ul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea angajatContact-ului.
 */
router.put("/:id", updateAngajatContact);

/**
 * @swagger
 * /api/nord/angajatContactNord/{id}:
 *   delete:
 *     summary: Șterge un angajatContact
 *     description: Șterge un angajatContact specificat prin ID din baza de date.
 *     tags: [NORD - Angajati]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul angajatContact-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: AngajatContact șters cu succes.
 *       404:
 *         description: AngajatContact-ul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea angajatContact-ului.
 */
router.delete("/:id", deleteAngajatContact);

module.exports = router;