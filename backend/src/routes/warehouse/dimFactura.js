const express = require("express");
const router = express.Router();
const { createFactura, getAllFacturi, getFacturaById, updateFactura, deleteFactura } = require("../../controllers/warehouse/dimFacturaController");

/**
 * @swagger
 * tags:
 *   name: Warehouse - Factura
 *   description: API pentru gestionarea facturilor
 */

/**
 * @swagger
 * /api/warehouse/dimFactura:
 *   post:
 *     summary: Creează o factură
 *     description: Adaugă o nouă factură în baza de date.
 *     tags: [Warehouse - Factura]
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
 *               data_emitere:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-28"
 *               pret:
 *                 type: number
 *                 format: decimal
 *                 example: 150.75
 *     responses:
 *       201:
 *         description: Factura creată cu succes.
 *       500:
 *         description: Eroare la crearea facturii.
 */
router.post("/", createFactura);

/**
 * @swagger
 * /api/warehouse/dimFactura:
 *   get:
 *     summary: Preia toate facturile
 *     description: Returnează lista completă a facturilor din baza de date.
 *     tags: [Warehouse - Factura]
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
 *                   data_emitere:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-28"
 *                   pret:
 *                     type: number
 *                     format: decimal
 *                     example: 150.75
 *       500:
 *         description: Eroare la preluarea facturilor.
 */
router.get("/", getAllFacturi);

/**
 * @swagger
 * /api/warehouse/dimFactura/{id}:
 *   get:
 *     summary: Preia factura după ID
 *     description: Returnează detaliile unei facturi specificate prin ID.
 *     tags: [Warehouse - Factura]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul facturii (cod_factura).
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
 * /api/warehouse/dimFactura/{id}:
 *   put:
 *     summary: Actualizează o factură
 *     description: Actualizează detaliile unei facturi specificate prin ID.
 *     tags: [Warehouse - Factura]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul facturii (cod_factura).
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
 *               data_emitere:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-28"
 *               pret:
 *                 type: number
 *                 format: decimal
 *                 example: 150.75
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
 * /api/warehouse/dimFactura/{id}:
 *   delete:
 *     summary: Șterge o factură
 *     description: Șterge o factură specificată prin ID din baza de date.
 *     tags: [Warehouse - Factura]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul facturii (cod_factura).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Factura ștearsă cu succes.
 *       404:
 *         description: Factura nu a fost găsită.
 *       500:
 *         description: Eroare la ștergerea facturii.
 */
router.delete("/:id", deleteFactura);

module.exports = router;