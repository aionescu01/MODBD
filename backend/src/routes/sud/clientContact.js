const express = require("express");
const router = express.Router();
const { createClientContact, getAllClientContact, getClientContactById, updateClientContact, deleteClientContact } = require("../../controllers/sud/clientContactController");

/**
 * @swagger
 * tags:
 *   name: OLTP - Clienti
 *   description: API pentru gestionarea clienților
 */

/**
 * @swagger
 * /api/sud/clientContactSud:
 *   post:
 *     summary: Creează un clientContact
 *     description: Adaugă un nou clientContact în baza de date.
 *     tags: [OLTP - Clienti]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nr_telefon:
 *                 type: string
 *                 example: "0123456789"
 *               apelativ:
 *                 type: string
 *                 example: "Domn"
 *     responses:
 *       201:
 *         description: ClientContact creat cu succes.
 *       500:
 *         description: Eroare la crearea clientContact-ului.
 */
router.post("/", createClientContact);

/**
 * @swagger
 * /api/sud/clientContactSud:
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
 *                   nr_telefon:
 *                     type: string
 *                     example: "0123456789"
 *                   apelativ:
 *                     type: string
 *                     example: "Domn"
 *       500:
 *         description: Eroare la preluarea clienților.
 */
router.get("/", getAllClientContact);

/**
 * @swagger
 * /api/sud/clientContactSud/{id}:
 *   get:
 *     summary: Preia un clientContact după ID
 *     description: Returnează datele unui clientContact specificat prin ID.
 *     tags: [OLTP - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientContact-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: ClientContact găsit.
 *       404:
 *         description: ClientContact-ul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea clientContact-ului.
 */
router.get("/:id", getClientContactById);

/**
 * @swagger
 * /api/sud/clientContactSud/{id}:
 *   put:
 *     summary: Actualizează un clientContact
 *     description: Actualizează datele unui clientContact specificat prin ID.
 *     tags: [OLTP - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientContact-ului.
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
 *                 example: "0987654321"
 *               apelativ:
 *                 type: string
 *                 example: "Domn"
 *     responses:
 *       200:
 *         description: ClientContact actualizat cu succes.
 *       404:
 *         description: ClientContact-ul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea clientContact-ului.
 */
router.put("/:id", updateClientContact);

/**
 * @swagger
 * /api/sud/clientContactSud/{id}:
 *   delete:
 *     summary: Șterge un clientContact
 *     description: Șterge un clientContact specificat prin ID din baza de date.
 *     tags: [OLTP - Clienti]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul clientContact-ului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: ClientContact șters cu succes.
 *       404:
 *         description: ClientContact-ul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea clientContact-ului.
 */
router.delete("/:id", deleteClientContact);

module.exports = router;