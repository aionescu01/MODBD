const express = require("express");
const router = express.Router();
const { createClient, getAllClienti, getClientById, updateClient, deleteClient } = require("../../controllers/oltp/clientController");

/**
 * @swagger
 * tags:
 *   name: OLTP - Clienti
 *   description: API pentru gestionarea clienților
 */

/**
 * @swagger
 * /api/oltp/client:
 *   post:
 *     summary: Creează un client
 *     description: Adaugă un nou client în baza de date.
 *     tags: [OLTP - Clienti]
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
 *               nr_telefon:
 *                 type: string
 *                 example: "0123456789"
 *               apelativ:
 *                 type: string
 *                 example: "Domn"
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
 *         description: Client creat cu succes.
 *       500:
 *         description: Eroare la crearea clientului.
 */
router.post("/", createClient);

/**
 * @swagger
 * /api/oltp/client:
 *   get:
 *     summary: Preia toți clienții
 *     description: Returnează lista completă a clienților din baza de date.
 *     tags: [OLTP - Clienti]
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
 *                   nr_telefon:
 *                     type: string
 *                     example: "0123456789"
 *                   apelativ:
 *                     type: string
 *                     example: "Domn"
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
router.get("/", getAllClienti);

/**
 * @swagger
 * /api/oltp/client/{id}:
 *   get:
 *     summary: Preia un client după ID
 *     description: Returnează datele unui client specificat prin ID.
 *     tags: [OLTP - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientului.
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
 * /api/oltp/client/{id}:
 *   put:
 *     summary: Actualizează un client
 *     description: Actualizează datele unui client specificat prin ID.
 *     tags: [OLTP - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientului.
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
 *               nr_telefon:
 *                 type: string
 *                 example: "0987654321"
 *               apelativ:
 *                 type: string
 *                 example: "Domn"
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
 *         description: Client actualizat cu succes.
 *       404:
 *         description: Clientul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea clientului.
 */
router.put("/:id", updateClient);

/**
 * @swagger
 * /api/oltp/client/{id}:
 *   delete:
 *     summary: Șterge un client
 *     description: Șterge un client specificat prin ID din baza de date.
 *     tags: [OLTP - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientului.
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