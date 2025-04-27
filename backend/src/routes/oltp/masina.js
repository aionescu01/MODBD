const express = require("express");
const router = express.Router();
const { createMasina, getAllMasini, getMasinaById, updateMasina, deleteMasina } = require("../../controllers/oltp/masinaController");

/**
 * @swagger
 * tags:
 *   name: OLTP - Masina
 *   description: API pentru gestionarea mașinilor
 */

/**
 * @swagger
 * /api/oltp/masina:
 *   post:
 *     summary: Creează o mașină
 *     description: Adaugă o nouă mașină în baza de date.
 *     tags: [OLTP - Masina]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numar_masina:
 *                 type: string
 *                 example: "B123XYZ"
 *               data_achizitionare:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-28"
 *               data_revizie_urm:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-31"
 *               marca:
 *                 type: string
 *                 example: "BMW"
 *               model:
 *                 type: string
 *                 example: "X5"
 *     responses:
 *       201:
 *         description: Mașina creată cu succes.
 *       500:
 *         description: Eroare la crearea mașinii.
 */
router.post("/", createMasina);

/**
 * @swagger
 * /api/oltp/masina:
 *   get:
 *     summary: Preia toate mașinile
 *     description: Returnează lista completă a mașinilor din baza de date.
 *     tags: [OLTP - Masina]
 *     responses:
 *       200:
 *         description: Lista mașinilor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cod_masina:
 *                     type: integer
 *                     example: 1
 *                   numar_masina:
 *                     type: string
 *                     example: "B123XYZ"
 *                   data_achizitionare:
 *                     type: string
 *                     format: date
 *                     example: "2025-01-28"
 *                   data_revizie_urm:
 *                     type: string
 *                     format: date
 *                     example: "2025-12-31"
 *                   marca:
 *                     type: string
 *                     example: "BMW"
 *                   model:
 *                     type: string
 *                     example: "X5"
 *       500:
 *         description: Eroare la preluarea mașinilor.
 */
router.get("/", getAllMasini);

/**
 * @swagger
 * /api/oltp/masina/{id}:
 *   get:
 *     summary: Preia mașina după ID
 *     description: Returnează detaliile unei mașini specificate prin ID.
 *     tags: [OLTP - Masina]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul mașinii (cod_masina).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Mașina găsită.
 *       404:
 *         description: Mașina nu a fost găsită.
 *       500:
 *         description: Eroare la preluarea mașinii.
 */
router.get("/:id", getMasinaById);

/**
 * @swagger
 * /api/oltp/masina/{id}:
 *   put:
 *     summary: Actualizează o mașină
 *     description: Actualizează detaliile unei mașini specificate prin ID.
 *     tags: [OLTP - Masina]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul mașinii (cod_masina).
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
 *               numar_masina:
 *                 type: string
 *                 example: "B123XYZ"
 *               data_achizitionare:
 *                 type: string
 *                 format: date
 *                 example: "2025-01-28"
 *               data_revizie_urm:
 *                 type: string
 *                 format: date
 *                 example: "2025-12-31"
 *               marca:
 *                 type: string
 *                 example: "BMW"
 *               model:
 *                 type: string
 *                 example: "X5"
 *     responses:
 *       200:
 *         description: Mașina actualizată cu succes.
 *       404:
 *         description: Mașina nu a fost găsită.
 *       500:
 *         description: Eroare la actualizarea mașinii.
 */
router.put("/:id", updateMasina);

/**
 * @swagger
 * /api/oltp/masina/{id}:
 *   delete:
 *     summary: Șterge o mașină
 *     description: Șterge o mașină specificată prin ID din baza de date.
 *     tags: [OLTP - Masina]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul mașinii (cod_masina).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Mașina ștearsă cu succes.
 *       404:
 *         description: Mașina nu a fost găsită.
 *       500:
 *         description: Eroare la ștergerea mașinii.
 */
router.delete("/:id", deleteMasina);

module.exports = router;