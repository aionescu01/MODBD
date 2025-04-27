const express = require("express");
const router = express.Router();
const { createTimp, getAllTimp, getTimpById, updateTimp, deleteTimp } = require("../../controllers/warehouse/dimTimpController");

/**
 * @swagger
 * tags:
 *   name: Warehouse - Timp
 *   description: API pentru gestionarea timpului
 */

/**
 * @swagger
 * /api/warehouse/dimTimpp:
 *   post:
 *     summary: Creează un timp
 *     description: Adaugă o nouă înregistrare de timp în baza de date.
 *     tags: [Warehouse - Timp]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-15"
 *               anul:
 *                 type: integer
 *                 example: 2023
 *               luna:
 *                 type: integer
 *                 example: 1
 *               nume_luna:
 *                 type: string
 *                 example: "Ianuarie"
 *               trimestru:
 *                 type: integer
 *                 example: 1
 *               ziua:
 *                 type: integer
 *                 example: 15
 *               ziua_saptamanii:
 *                 type: integer
 *                 example: 1
 *               nume_zi:
 *                 type: string
 *                 example: "Luni"
 *               este_weekend:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       201:
 *         description: Timp creat cu succes.
 *       500:
 *         description: Eroare la crearea timpului.
 */
router.post("/", createTimp);

/**
 * @swagger
 * /api/warehouse/dimTimpp:
 *   get:
 *     summary: Preia toate înregistrările de timp
 *     description: Returnează lista completă a înregistrărilor de timp din baza de date.
 *     tags: [Warehouse - Timp]
 *     responses:
 *       200:
 *         description: Lista înregistrărilor de timp.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cod_timp:
 *                     type: integer
 *                     example: 1
 *                   data:
 *                     type: string
 *                     format: date
 *                     example: "2023-01-15"
 *                   anul:
 *                     type: integer
 *                     example: 2023
 *                   luna:
 *                     type: integer
 *                     example: 1
 *                   nume_luna:
 *                     type: string
 *                     example: "Ianuarie"
 *                   trimestru:
 *                     type: integer
 *                     example: 1
 *                   ziua:
 *                     type: integer
 *                     example: 15
 *                   ziua_saptamanii:
 *                     type: integer
 *                     example: 1
 *                   nume_zi:
 *                     type: string
 *                     example: "Luni"
 *                   este_weekend:
 *                     type: integer
 *                     example: 0
 *       500:
 *         description: Eroare la preluarea timpurilor.
 */
router.get("/", getAllTimp);

/**
 * @swagger
 * /api/warehouse/dimTimpp/{id}:
 *   get:
 *     summary: Preia înregistrarea de timp după ID
 *     description: Returnează detaliile unei înregistrări de timp specificate prin ID.
 *     tags: [Warehouse - Timp]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul timpului (cod_timp).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Timp găsit.
 *       404:
 *         description: Timpul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea timpului.
 */
router.get("/:id", getTimpById);

/**
 * @swagger
 * /api/warehouse/dimTimpp/{id}:
 *   put:
 *     summary: Actualizează o înregistrare de timp
 *     description: Actualizează detaliile unei înregistrări de timp specificate prin ID.
 *     tags: [Warehouse - Timp]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul timpului (cod_timp).
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
 *               data:
 *                 type: string
 *                 format: date
 *                 example: "2023-01-16"
 *               anul:
 *                 type: integer
 *                 example: 2023
 *               luna:
 *                 type: integer
 *                 example: 1
 *               nume_luna:
 *                 type: string
 *                 example: "Ianuarie"
 *               trimestru:
 *                 type: integer
 *                 example: 1
 *               ziua:
 *                 type: integer
 *                 example: 16
 *               ziua_saptamanii:
 *                 type: integer
 *                 example: 2
 *               nume_zi:
 *                 type: string
 *                 example: "Marți"
 *               este_weekend:
 *                 type: integer
 *                 example: 0
 *     responses:
 *       200:
 *         description: Timp actualizat cu succes.
 *       404:
 *         description: Timpul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea timpului.
 */
router.put("/:id", updateTimp);

/**
 * @swagger
 * /api/warehouse/dimTimpp/{id}:
 *   delete:
 *     summary: Șterge o înregistrare de timp
 *     description: Șterge o înregistrare de timp specificată prin ID din baza de date.
 *     tags: [Warehouse - Timp]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul timpului (cod_timp).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Timp ștearsă cu succes.
 *       404:
 *         description: Timpul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea timpului.
 */
router.delete("/:id", deleteTimp);

module.exports = router;