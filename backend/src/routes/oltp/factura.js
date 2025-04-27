const express = require("express");
const router = express.Router();
const { createFactura, getAllFacturi, getFacturaById, updateFactura, deleteFactura } = require("../../controllers/oltp/facturaController");

/**
 * @swagger
 * tags:
 *   name: OLTP - Factura
 *   description: API pentru gestionarea facturilor
 */

/**
 * @swagger
 * /api/oltp/factura:
 *   post:
 *     summary: Creează factura
 *     description: Adaugă o nouă factură în baza de date.
 *     tags: [OLTP - Factura]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cod_dispecer:
 *                 type: integer
 *                 example: 123
 *               cod_cursa:
 *                 type: integer
 *                 example: 456
 *               pret:
 *                 type: number
 *                 format: decimal
 *                 example: 100.50
 *     responses:
 *       201:
 *         description: Factura creată cu succes.
 *       500:
 *         description: Eroare la crearea facturii.
 */
router.post("/", createFactura);

/**
 * @swagger
 * /api/oltp/factura:
 *   get:
 *     summary: Preia toate facturile
 *     description: Returnează lista completă a facturilor din baza de date.
 *     tags: [OLTP - Factura]
 *     responses:
 *       200:
 *         description: Lista facturilor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cod_factura:
 *                     type: integer
 *                     example: 1
 *                   cod_dispecer:
 *                     type: integer
 *                     example: 123
 *                   cod_cursa:
 *                     type: integer
 *                     example: 456
 *                   pret:
 *                     type: number
 *                     format: decimal
 *                     example: 100.50
 *       500:
 *         description: Eroare la preluarea facturilor.
 */
router.get("/", getAllFacturi);

/**
 * @swagger
 * /api/oltp/factura/{id}:
 *   get:
 *     summary: Preia factura după ID
 *     description: Returnează detaliile unei facturi specificate prin ID.
 *     tags: [OLTP - Factura]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul facturii.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Factura găsită.
 *       404:
 *         description: Factura nu a fost găsită.
 *       500:
 *         description: Eroare la preluarea facturii.
 */
router.get("/:id", getFacturaById);

/**
 * @swagger
 * /api/oltp/factura/{id}:
 *   put:
 *     summary: Actualizează factura
 *     description: Actualizează detaliile unei facturi specificate prin ID.
 *     tags: [OLTP - Factura]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul facturii.
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
 *               cod_dispecer:
 *                 type: integer
 *                 example: 123
 *               cod_cursa:
 *                 type: integer
 *                 example: 456
 *               pret:
 *                 type: number
 *                 format: decimal
 *                 example: 150.00
 *     responses:
 *       200:
 *         description: Factura actualizată cu succes.
 *       404:
 *         description: Factura nu a fost găsită.
 *       500:
 *         description: Eroare la actualizarea facturii.
 */
router.put("/:id", updateFactura);

/**
 * @swagger
 * /api/oltp/factura/{id}:
 *   delete:
 *     summary: Șterge factura
 *     description: Șterge factura specificată prin ID din baza de date.
 *     tags: [OLTP - Factura]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul facturii.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Factura ștersă cu succes.
 *       404:
 *         description: Factura nu a fost găsită.
 *       500:
 *         description: Eroare la ștergerea facturii.
 */
router.delete("/:id", deleteFactura);

module.exports = router;