const express = require("express");
const router = express.Router();
const { createCursa, getAllCurse, getCursaById, updateCursa, deleteCursa } = require("../../controllers/warehouse/FCursaController");

/**
 * @swagger
 * tags:
 *   name: Warehouse - Cursa
 *   description: API pentru gestionarea curselor
 */

/**
 * @swagger
 * /api/warehouse/FCursa:
 *   post:
 *     summary: Creează o cursă
 *     description: Adaugă o nouă înregistrare de cursă în baza de date.
 *     tags: [Warehouse - Cursa]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota_sofer:
 *                 type: number
 *                 format: decimal
 *                 example: 9.5
 *               nota_client:
 *                 type: number
 *                 format: decimal
 *                 example: 9.0
 *               cod_factura:
 *                 type: integer
 *                 example: 101
 *               cod_client:
 *                 type: integer
 *                 example: 1
 *               cod_angajat:
 *                 type: integer
 *                 example: 15
 *               cod_masina:
 *                 type: integer
 *                 example: 4
 *               cod_locatie:
 *                 type: integer
 *                 example: 7
 *               cod_timp:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Cursa creată cu succes.
 *       500:
 *         description: Eroare la crearea cursei.
 */
router.post("/", createCursa);

/**
 * @swagger
 * /api/warehouse/FCursa:
 *   get:
 *     summary: Preia toate cursele
 *     description: Returnează lista completă a curselor din baza de date.
 *     tags: [Warehouse - Cursa]
 *     responses:
 *       200:
 *         description: Lista curselor.
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
 *                   nota_sofer:
 *                     type: number
 *                     format: decimal
 *                     example: 9.5
 *                   nota_client:
 *                     type: number
 *                     format: decimal
 *                     example: 9.0
 *                   cod_factura:
 *                     type: integer
 *                     example: 101
 *                   cod_client:
 *                     type: integer
 *                     example: 1
 *                   cod_angajat:
 *                     type: integer
 *                     example: 15
 *                   cod_masina:
 *                     type: integer
 *                     example: 4
 *                   cod_locatie:
 *                     type: integer
 *                     example: 7
 *                   cod_timp:
 *                     type: integer
 *                     example: 10
 *       500:
 *         description: Eroare la preluarea curselor.
 */
router.get("/", getAllCurse);

/**
 * @swagger
 * /api/warehouse/FCursa/{id}:
 *   get:
 *     summary: Preia cursa după ID
 *     description: Returnează detaliile unei curse specifice prin ID.
 *     tags: [Warehouse - Cursa]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul cursei (cod_cursa).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Cursa găsită.
 *       404:
 *         description: Cursa nu a fost găsită.
 *       500:
 *         description: Eroare la preluarea cursei.
 */
router.get("/:id", getCursaById);

/**
 * @swagger
 * /api/warehouse/FCursa/{id}:
 *   put:
 *     summary: Actualizează o cursă
 *     description: Actualizează detaliile unei curse specifice prin ID.
 *     tags: [Warehouse - Cursa]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul cursei (cod_cursa).
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
 *               nota_sofer:
 *                 type: number
 *                 format: decimal
 *                 example: 9.0
 *               nota_client:
 *                 type: number
 *                 format: decimal
 *                 example: 8.5
 *               cod_factura:
 *                 type: integer
 *                 example: 102
 *               cod_client:
 *                 type: integer
 *                 example: 2
 *               cod_angajat:
 *                 type: integer
 *                 example: 16
 *               cod_masina:
 *                 type: integer
 *                 example: 5
 *               cod_locatie:
 *                 type: integer
 *                 example: 8
 *               cod_timp:
 *                 type: integer
 *                 example: 11
 *     responses:
 *       200:
 *         description: Cursa actualizată cu succes.
 *       404:
 *         description: Cursa nu a fost găsită.
 *       500:
 *         description: Eroare la actualizarea cursei.
 */
router.put("/:id", updateCursa);

/**
 * @swagger
 * /api/warehouse/FCursa/{id}:
 *   delete:
 *     summary: Șterge o cursă
 *     description: Șterge o cursă specificată prin ID din baza de date.
 *     tags: [Warehouse - Cursa]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul cursei (cod_cursa).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Cursa ștearsă cu succes.
 *       404:
 *         description: Cursa nu a fost găsită.
 *       500:
 *         description: Eroare la ștergerea cursei.
 */
router.delete("/:id", deleteCursa);

module.exports = router;