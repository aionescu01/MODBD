const express = require("express");
const router = express.Router();
const { createDetaliiCursaNord, getAllDetaliiCurseNord, getDetaliiCursaNordById, updateDetaliiCursaNord, deleteDetaliiCursaNord } = require("../../controllers/nord/detaliiCursaNordController");

/**
 * @swagger
 * tags:
 *   name: NORD - DetaliiCursa
 *   description: API pentru gestionarea detaliilor curselor
 */

/**
 * @swagger
 * /api/nord/detaliiCursaNord:
 *   post:
 *     summary: Creează detalii cursă
 *     description: Adaugă un nou detaliu al unei curse în baza de date.
 *     tags: [NORD - DetaliiCursa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cod_cursa:
 *                 type: integer
 *                 example: 1
 *               data_cursa:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-01-28T10:00:00Z"
 *               nota_sofer:
 *                 type: integer
 *                 example: 5
 *               nota_client:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       201:
 *         description: Detalii cursă create cu succes.
 *       500:
 *         description: Eroare la crearea detaliilor cursei.
 */
router.post("/", createDetaliiCursaNord);

/**
 * @swagger
 * /api/nord/detaliiCursaNord:
 *   get:
 *     summary: Preia toate detaliile curselor
 *     description: Returnează lista completă a detaliilor curselor din baza de date.
 *     tags: [NORD - DetaliiCursa]
 *     responses:
 *       200:
 *         description: Lista detaliilor curselor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cod_cursa:
 *                     type: integer
 *                     example: 1
 *                   data_cursa:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-01-28T10:00:00Z"
 *                   nota_sofer:
 *                     type: integer
 *                     example: 5
 *                   nota_client:
 *                     type: integer
 *                     example: 4
 *       500:
 *         description: Eroare la preluarea detaliilor curselor.
 */
router.get("/", getAllDetaliiCurseNord);

/**
 * @swagger
 * /api/nord/detaliiCursaNord/{id}:
 *   get:
 *     summary: Preia detalii cursă după ID
 *     description: Returnează detaliile unei curse specifice prin ID.
 *     tags: [NORD - DetaliiCursa]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul detaliilor cursei.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalii cursă găsite.
 *       404:
 *         description: Detaliile cursei nu au fost găsite.
 *       500:
 *         description: Eroare la preluarea detaliilor cursei.
 */
router.get("/:id", getDetaliiCursaNordById);

/**
 * @swagger
 * /api/nord/detaliiCursaNord/{id}:
 *   put:
 *     summary: Actualizează detalii cursă
 *     description: Actualizează detaliile unei curse specifice prin ID.
 *     tags: [NORD - DetaliiCursa]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul detaliilor cursei.
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
 *               cod_cursa:
 *                 type: integer
 *                 example: 1
 *               data_cursa:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-01-28T12:00:00Z"
 *               nota_sofer:
 *                 type: integer
 *                 example: 5
 *               nota_client:
 *                 type: integer
 *                 example: 4
 *     responses:
 *       200:
 *         description: Detalii cursă actualizate cu succes.
 *       404:
 *         description: Detaliile cursei nu au fost găsite.
 *       500:
 *         description: Eroare la actualizarea detaliilor cursei.
 */
router.put("/:id", updateDetaliiCursaNord);

/**
 * @swagger
 * /api/nord/detaliiCursaNord/{id}:
 *   delete:
 *     summary: Șterge detalii cursă
 *     description: Șterge detaliile unei curse specificate prin ID din baza de date.
 *     tags: [NORD - DetaliiCursa]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul detaliilor cursei.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detalii cursă șterse cu succes.
 *       404:
 *         description: Detaliile cursei nu au fost găsite.
 *       500:
 *         description: Eroare la ștergerea detaliilor cursei.
 */
router.delete("/:id", deleteDetaliiCursaNord);

module.exports = router;