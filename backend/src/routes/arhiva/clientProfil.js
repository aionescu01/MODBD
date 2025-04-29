const express = require("express");
const router = express.Router();
const { createClientProfil, getAllClientiProfil, getClientProfilById, updateClientProfil, deleteClientProfil } = require("../../controllers/arhiva/clientProfilController");

/**
 * @swagger
 * tags:
 *   name: ARHIVA - Clienti
 *   description: API pentru gestionarea clienților
 */

/**
 * @swagger
 * /api/arhiva/clientProfil:
 *   post:
 *     summary: Creează un clientprofil
 *     description: Adaugă un nou clientprofil în baza de date.
 *     tags: [ARHIVA - Clienti]
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
 *                 example: "1980-01-01"
 *               nota:
 *                 type: number
 *                 format: decimal
 *                 example: 4.5
 *     responses:
 *       201:
 *         description: ClientProfil creat cu succes.
 *       500:
 *         description: Eroare la crearea clientprofil-ului.
 */
router.post("/", createClientProfil);

/**
 * @swagger
 * /api/arhiva/clientProfil:
 *   get:
 *     summary: Preia toți clienții
 *     description: Returnează lista completă a clienților din baza de date.
 *     tags: [ARHIVA - Clienti]
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
 *                   data_nastere:
 *                     type: string
 *                     format: date
 *                     example: "1980-01-01"
 *                   nota:
 *                     type: number
 *                     format: decimal
 *                     example: 4.5
 *       500:
 *         description: Eroare la preluarea clienților.
 */
router.get("/", getAllClientiProfil);

/**
 * @swagger
 * /api/arhiva/clientProfil/{id}:
 *   get:
 *     summary: Preia un clientprofil după ID
 *     description: Returnează datele unui clientprofil specificat prin ID.
 *     tags: [ARHIVA - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientprofil-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: ClientProfil găsit.
 *       404:
 *         description: ClientProfil-ul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea clientprofil-ului.
 */
router.get("/:id", getClientProfilById);

/**
 * @swagger
 * /api/arhiva/clientProfil/{id}:
 *   put:
 *     summary: Actualizează un clientprofil
 *     description: Actualizează datele unui clientprofil specificat prin ID.
 *     tags: [ARHIVA - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientprofil-ului.
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
 *                 example: "1980-01-01"
 *               nota:
 *                 type: number
 *                 format: decimal
 *                 example: 4.7
 *     responses:
 *       200:
 *         description: ClientProfil actualizat cu succes.
 *       404:
 *         description: ClientProfil-ul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea clientprofil-ului.
 */
router.put("/:id", updateClientProfil);

/**
 * @swagger
 * /api/arhiva/clientProfil/{id}:
 *   delete:
 *     summary: Șterge un clientprofil
 *     description: Șterge un clientprofil specificat prin ID din baza de date.
 *     tags: [ARHIVA - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientprofil-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: ClientProfil șters cu succes.
 *       404:
 *         description: ClientProfil-ul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea clientprofil-ului.
 */
router.delete("/:id", deleteClientProfil);

module.exports = router;