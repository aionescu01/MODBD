const express = require("express");
const router = express.Router();
const { createClientIdentity, getAllClientIdentity, getClientIdentityById, updateClientIdentity, deleteClientIdentity } = require("../../controllers/central/clientIdentityController");

/**
 * @swagger
 * tags:
 *   name: CENTRAL - Clienti
 *   description: API pentru gestionarea clienților
 */

/**
 * @swagger
 * /api/central/clientIdentity:
 *   post:
 *     summary: Creează un clientIdentity
 *     description: Adaugă un nou clientIdentity în baza de date.
 *     tags: [CENTRAL - Clienti]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume:
 *                 type: string
 *                 example: Popescu
 *               prenume:
 *                 type: string
 *                 example: Ion
 *     responses:
 *       201:
 *         description: ClientIdentity creat cu succes.
 *       500:
 *         description: Eroare la crearea clientIdentity-ului.
 */
router.post("/", createClientIdentity);

/**
 * @swagger
 * /api/central/clientIdentity:
 *   get:
 *     summary: Preia toți clienții
 *     description: Returnează lista completă a clienților din baza de date.
 *     tags: [CENTRAL - Clienti]
 *     responses:
 *       200:
 *         description: Lista clienților.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cod_client:
 *                     type: integer
 *                     example: 1
 *                   nume:
 *                     type: string
 *                     example: Popescu
 *                   prenume:
 *                     type: string
 *                     example: Ion
 *       500:
 *         description: Eroare la preluarea clienților.
 */
router.get("/", getAllClientIdentity);

/**
 * @swagger
 * /api/central/clientIdentity/{id}:
 *   get:
 *     summary: Preia un clientIdentity după ID
 *     description: Returnează datele unui clientIdentity specificat prin ID.
 *     tags: [CENTRAL - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientIdentity-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: ClientIdentity găsit.
 *       404:
 *         description: ClientIdentity-ul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea clientIdentity-ului.
 */
router.get("/:id", getClientIdentityById);

/**
 * @swagger
 * /api/central/clientIdentity/{id}:
 *   put:
 *     summary: Actualizează un clientIdentity
 *     description: Actualizează datele unui clientIdentity specificat prin ID.
 *     tags: [CENTRAL - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientIdentity-ului.
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
 *                 example: Popescu
 *               prenume:
 *                 type: string
 *                 example: Ion
 *     responses:
 *       200:
 *         description: ClientIdentity actualizat cu succes.
 *       404:
 *         description: ClientIdentity-ul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea clientIdentity-ului.
 */
router.put("/:id", updateClientIdentity);

/**
 * @swagger
 * /api/central/clientIdentity/{id}:
 *   delete:
 *     summary: Șterge un clientIdentity
 *     description: Șterge un clientIdentity specificat prin ID din baza de date.
 *     tags: [CENTRAL - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientIdentity-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: ClientIdentity șters cu succes.
 *       404:
 *         description: ClientIdentity-ul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea clientIdentity-ului.
 */
router.delete("/:id", deleteClientIdentity);

module.exports = router;