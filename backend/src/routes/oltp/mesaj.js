const express = require("express");
const router = express.Router();
const { createMesaj, getAllMesaje, getMesajById, updateMesaj, deleteMesaj } = require("../../controllers/oltp/mesajController");

/**
 * @swagger
 * tags:
 *   name: OLTP - Mesaj
 *   description: API pentru gestionarea mesajelor
 */

/**
 * @swagger
 * /api/oltp/mesaj:
 *   post:
 *     summary: Creează un mesaj
 *     description: Adaugă un nou mesaj în baza de date.
 *     tags: [OLTP - Mesaj]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               MESSAGE:
 *                 type: string
 *                 example: "Mesaj de test"
 *               MESSAGE_TYPE:
 *                 type: string
 *                 enum: [E, W, I]
 *                 example: "E"
 *               CREATED_BY:
 *                 type: string
 *                 example: "user1"
 *               CREATED_AT:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-28"
 *     responses:
 *       201:
 *         description: Mesaj creat cu succes.
 *       500:
 *         description: Eroare la crearea mesajului.
 */
router.post("/", createMesaj);

/**
 * @swagger
 * /api/oltp/mesaj:
 *   get:
 *     summary: Preia toate mesajele
 *     description: Returnează lista completă a mesajelor din baza de date.
 *     tags: [OLTP - Mesaj]
 *     responses:
 *       200:
 *         description: Lista mesajelor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   MESSAGE_ID:
 *                     type: integer
 *                     example: 1
 *                   MESSAGE:
 *                     type: string
 *                     example: "Mesaj de test"
 *                   MESSAGE_TYPE:
 *                     type: string
 *                     example: "E"
 *                   CREATED_BY:
 *                     type: string
 *                     example: "user1"
 *                   CREATED_AT:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-28"
 *       500:
 *         description: Eroare la preluarea mesajelor.
 */
router.get("/", getAllMesaje);

/**
 * @swagger
 * /api/oltp/mesaj/{id}:
 *   get:
 *     summary: Preia mesajul după ID
 *     description: Returnează detaliile unui mesaj specificat prin ID.
 *     tags: [OLTP - Mesaj]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul mesajului (MESSAGE_ID).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Mesaj găsit.
 *       404:
 *         description: Mesajul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea mesajului.
 */
router.get("/:id", getMesajById);

/**
 * @swagger
 * /api/oltp/mesaj/{id}:
 *   put:
 *     summary: Actualizează un mesaj
 *     description: Actualizează detaliile unui mesaj specificat prin ID.
 *     tags: [OLTP - Mesaj]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul mesajului (MESSAGE_ID).
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
 *               MESSAGE:
 *                 type: string
 *                 example: "Mesaj actualizat"
 *               MESSAGE_TYPE:
 *                 type: string
 *                 enum: [E, W, I]
 *                 example: "W"
 *               CREATED_BY:
 *                 type: string
 *                 example: "user2"
 *               CREATED_AT:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-29"
 *     responses:
 *       200:
 *         description: Mesaj actualizat cu succes.
 *       404:
 *         description: Mesajul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea mesajului.
 */
router.put("/:id", updateMesaj);

/**
 * @swagger
 * /api/oltp/mesaj/{id}:
 *   delete:
 *     summary: Șterge un mesaj
 *     description: Șterge un mesaj specificat prin ID din baza de date.
 *     tags: [OLTP - Mesaj]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul mesajului (MESSAGE_ID).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Mesaj șters cu succes.
 *       404:
 *         description: Mesajul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea mesajului.
 */
router.delete("/:id", deleteMesaj);

module.exports = router;