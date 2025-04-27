const express = require("express");
const router = express.Router();
const { createDiscount, getAllDiscounts, getDiscountById, updateDiscount, deleteDiscount } = require("../../controllers/oltp/discountController");

/**
 * @swagger
 * tags:
 *   name: OLTP - Discount
 *   description: API pentru gestionarea discounturilor
 */

/**
 * @swagger
 * /api/oltp/discount:
 *   post:
 *     summary: Creează discount
 *     description: Adaugă un nou discount în baza de date.
 *     tags: [OLTP - Discount]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nota_discount:
 *                 type: integer
 *                 example: 1
 *               cod_discount:
 *                 type: integer
 *                 example: 100
 *     responses:
 *       201:
 *         description: Discount creat cu succes.
 *       500:
 *         description: Eroare la crearea discountului.
 */
router.post("/", createDiscount);

/**
 * @swagger
 * /api/oltp/discount:
 *   get:
 *     summary: Preia toate discounturile
 *     description: Returnează lista completă a discounturilor din baza de date.
 *     tags: [OLTP - Discount]
 *     responses:
 *       200:
 *         description: Lista discounturilor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   nota_discount:
 *                     type: integer
 *                     example: 1
 *                   cod_discount:
 *                     type: integer
 *                     example: 100
 *       500:
 *         description: Eroare la preluarea discounturilor.
 */
router.get("/", getAllDiscounts);

/**
 * @swagger
 * /api/oltp/discount/{id}:
 *   get:
 *     summary: Preia discount după ID
 *     description: Returnează detaliile unui discount specific prin ID.
 *     tags: [OLTP - Discount]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul discountului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Discount găsit.
 *       404:
 *         description: Discountul nu a fost găsit.
 *       500:
 *         description: Eroare la preluarea discountului.
 */
router.get("/:id", getDiscountById);

/**
 * @swagger
 * /api/oltp/discount/{id}:
 *   put:
 *     summary: Actualizează discount
 *     description: Actualizează detaliile unui discount specific prin ID.
 *     tags: [OLTP - Discount]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul discountului.
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
 *               nota_discount:
 *                 type: integer
 *                 example: 1
 *               cod_discount:
 *                 type: integer
 *                 example: 200
 *     responses:
 *       200:
 *         description: Discount actualizat cu succes.
 *       404:
 *         description: Discountul nu a fost găsit.
 *       500:
 *         description: Eroare la actualizarea discountului.
 */
router.put("/:id", updateDiscount);

/**
 * @swagger
 * /api/oltp/discount/{id}:
 *   delete:
 *     summary: Șterge discount
 *     description: Șterge discountul specificat prin ID din baza de date.
 *     tags: [OLTP - Discount]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul discountului.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Discount șters cu succes.
 *       404:
 *         description: Discountul nu a fost găsit.
 *       500:
 *         description: Eroare la ștergerea discountului.
 */
router.delete("/:id", deleteDiscount);

module.exports = router;