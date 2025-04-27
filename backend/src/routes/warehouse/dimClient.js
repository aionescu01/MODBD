const express = require("express");
const router = express.Router();
const { createClient, getAllClients, getClientById, updateClient, deleteClient } = require("../../controllers/warehouse/dimClientController");

/**
 * @swagger
 * tags:
 *   name: Warehouse - Client
 *   description: API pentru gestionarea clienților
 */

/**
 * @swagger
 * /api/warehouse/dimClient:
 *   post:
 *     summary: Creează un client
 *     description: Adaugă un nou client în baza de date.
 *     tags: [Warehouse - Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume_client:
 *                 type: string
 *                 example: "Maria Ionescu"
 *               nota_client:
 *                 type: number
 *                 format: decimal
 *                 example: 9.5
 *               apelativ:
 *                 type: string
 *                 example: "Dl."
 *               data_nastere:
 *                 type: string
 *                 format: date
 *                 example: "1985-06-15"
 *     responses:
 *       201:
 *         description: Client creat cu succes.
 *       500:
 *         description: Eroare la crearea clientului.
 */
router.post("/", createClient);

/**
 * @swagger
 * /api/warehouse/dimClient:
 *   get:
 *     summary: Preia toți clienții
 *     description: Returnează lista completă a clienților din baza de date.
 *     tags: [Warehouse - Client]
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
 *                   nume_client:
 *                     type: string
 *                     example: "Maria Ionescu"
 *                   nota_client:
 *                     type: number
 *                     format: decimal
 *                     example: 9.5
 *                   apelativ:
 *                     type: string
 *                     example: "Dl."
 *                   data_nastere:
 *                     type: string
 *                     format: date
 *                     example: "1985-06-15"
 *       500:
 *         description: Eroare la preluarea clienților.
 */
router.get("/", getAllClients);

/**
 * @swagger
 * /api/warehouse/dimClient/{id}:
 *   get:
 *     summary: Preia clientul după ID
 *     description: Returnează detaliile unui client specificat prin ID.
 *     tags: [Warehouse - Client]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientului (cod_client).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Client găsit.
 *       404:
 *         description: Clientul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea clientului.
 */
router.get("/:id", getClientById);

/**
 * @swagger
 * /api/warehouse/dimClient/{id}:
 *   put:
 *     summary: Actualizează un client
 *     description: Actualizează detaliile unui client specificat prin ID.
 *     tags: [Warehouse - Client]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientului (cod_client).
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
 *               nume_client:
 *                 type: string
 *                 example: "Maria Ionescu"
 *               nota_client:
 *                 type: number
 *                 format: decimal
 *                 example: 9.5
 *               apelativ:
 *                 type: string
 *                 example: "Dl."
 *               data_nastere:
 *                 type: string
 *                 format: date
 *                 example: "1985-06-15"
 *     responses:
 *       200:
 *         description: Client actualizat cu succes.
 *       404:
 *         description: Clientul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea clientului.
 */
router.put("/:id", updateClient);

/**
 * @swagger
 * /api/warehouse/dimClient/{id}:
 *   delete:
 *     summary: Șterge un client
 *     description: Șterge un client specificat prin ID din baza de date.
 *     tags: [Warehouse - Client]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientului (cod_client).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Client șters cu succes.
 *       404:
 *         description: Clientul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea clientului.
 */
router.delete("/:id", deleteClient);

module.exports = router;