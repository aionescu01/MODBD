const express = require("express");
const router = express.Router();
const { createIstoricSoferi, getAllIstoricSoferi, getIstoricSoferiById, updateIstoricSoferi, deleteIstoricSoferi } = require("../../controllers/oltp/istoricSoferiController");

/**
 * @swagger
 * tags:
 *   name: OLTP - IstoricSofer
 *   description: API pentru gestionarea istoricului șoferilor
 */

/**
 * @swagger
 * /api/oltp/istoricsoferi:
 *   post:
 *     summary: Creează istoricul șoferului
 *     description: Adaugă un nou istoric pentru un șofer în baza de date.
 *     tags: [OLTP - IstoricSofer]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cod_sofer:
 *                 type: integer
 *                 example: 1
 *               nota:
 *                 type: number
 *                 format: decimal
 *                 example: 9.50
 *               numar_curse:
 *                 type: integer
 *                 example: 120
 *     responses:
 *       201:
 *         description: Istoricul șoferului creat cu succes.
 *       500:
 *         description: Eroare la crearea istoricului șoferului.
 */
router.post("/", createIstoricSoferi);

/**
 * @swagger
 * /api/oltp/istoricsoferi:
 *   get:
 *     summary: Preia toate istoricele șoferilor
 *     description: Returnează lista completă a istoricului șoferilor din baza de date.
 *     tags: [OLTP - IstoricSofer]
 *     responses:
 *       200:
 *         description: Lista istoricului șoferilor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cod_sofer:
 *                     type: integer
 *                     example: 1
 *                   nota:
 *                     type: number
 *                     format: decimal
 *                     example: 9.50
 *                   numar_curse:
 *                     type: integer
 *                     example: 120
 *       500:
 *         description: Eroare la preluarea istoricului șoferilor.
 */
router.get("/", getAllIstoricSoferi);

/**
 * @swagger
 * /api/oltp/istoricsoferi/{id}:
 *   get:
 *     summary: Preia istoricul șoferului după ID
 *     description: Returnează detaliile istoricului unui șofer specificat prin ID.
 *     tags: [OLTP - IstoricSofer]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul istoricului șoferului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Istoricul șoferului găsit.
 *       404:
 *         description: Istoricul șoferului nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea istoricului șoferului.
 */
router.get("/:id", getIstoricSoferiById);

/**
 * @swagger
 * /api/oltp/istoricsoferi/{id}:
 *   put:
 *     summary: Actualizează istoricul șoferului
 *     description: Actualizează detaliile istoricului unui șofer specificat prin ID.
 *     tags: [OLTP - IstoricSofer]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul istoricului șoferului.
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
 *               nota:
 *                 type: number
 *                 format: decimal
 *                 example: 8.75
 *               numar_curse:
 *                 type: integer
 *                 example: 130
 *     responses:
 *       200:
 *         description: Istoricul șoferului actualizat cu succes.
 *       404:
 *         description: Istoricul șoferului nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea istoricului șoferului.
 */
router.put("/:id", updateIstoricSoferi);

/**
 * @swagger
 * /api/oltp/istoricsoferi/{id}:
 *   delete:
 *     summary: Șterge istoricul șoferului
 *     description: Șterge istoricul unui șofer specificat prin ID din baza de date.
 *     tags: [OLTP - IstoricSofer]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul istoricului șoferului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Istoricul șoferului șters cu succes.
 *       404:
 *         description: Istoricul șoferului nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea istoricului șoferului.
 */
router.delete("/:id", deleteIstoricSoferi);

module.exports = router;