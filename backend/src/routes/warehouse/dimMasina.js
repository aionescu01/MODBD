const express = require("express");
const router = express.Router();
const { createMasina, getAllMasini, getMasinaById, updateMasina, deleteMasina } = require("../../controllers/warehouse/dimMasinaController");

/**
 * @swagger
 * tags:
 *   name: Warehouse - Masina
 *   description: API pentru gestionarea masinii
 */

/**
 * @swagger
 * /api/warehouse/dimMasina:
 *   post:
 *     summary: Creează o masina
 *     description: Adaugă o nouă masina în baza de date.
 *     tags: [Warehouse - Masina]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               marca:
 *                 type: string
 *                 example: "Dacia"
 *               model:
 *                 type: string
 *                 example: "Lodgy"
 *               data_achizitionare:
 *                 type: string
 *                 format: date
 *                 example: "2020-05-15"
 *               data_revizie_urm:
 *                 type: string
 *                 format: date
 *                 example: "2023-05-15"
 *     responses:
 *       201:
 *         description: Masina creată cu succes.
 *       500:
 *         description: Eroare la crearea masinii.
 */
router.post("/", createMasina);

/**
 * @swagger
 * /api/warehouse/dimMasina:
 *   get:
 *     summary: Preia toate masinile
 *     description: Returnează lista completă a masinilor din baza de date.
 *     tags: [Warehouse - Masina]
 *     responses:
 *       200:
 *         description: Lista masinilor.
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
 *                   marca:
 *                     type: string
 *                     example: "Dacia"
 *                   model:
 *                     type: string
 *                     example: "Lodgy"
 *                   data_achizitionare:
 *                     type: string
 *                     format: date
 *                     example: "2020-05-15"
 *                   data_revizie_urm:
 *                     type: string
 *                     format: date
 *                     example: "2023-05-15"
 *       500:
 *         description: Eroare la preluarea masinilor.
 */
router.get("/", getAllMasini);

/**
 * @swagger
 * /api/warehouse/dimMasina/{id}:
 *   get:
 *     summary: Preia masina după ID
 *     description: Returnează detaliile unei masini specificate prin ID.
 *     tags: [Warehouse - Masina]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul masinii (cod_masina).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Masina găsită.
 *       404:
 *         description: Masina nu a fost găsită.
 *       500:
 *         description: Eroare la preluarea masinii.
 */
router.get("/:id", getMasinaById);

/**
 * @swagger
 * /api/warehouse/dimMasina/{id}:
 *   put:
 *     summary: Actualizează o masina
 *     description: Actualizează detaliile unei masini specificate prin ID.
 *     tags: [Warehouse - Masina]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul masinii (cod_masina).
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
 *               marca:
 *                 type: string
 *                 example: "Ford"
 *               model:
 *                 type: string
 *                 example: "Focus"
 *               data_achizitionare:
 *                 type: string
 *                 format: date
 *                 example: "2021-07-10"
 *               data_revizie_urm:
 *                 type: string
 *                 format: date
 *                 example: "2023-07-10"
 *     responses:
 *       200:
 *         description: Masina actualizată cu succes.
 *       404:
 *         description: Masina nu a fost găsită.
 *       500:
 *         description: Eroare la actualizarea masinii.
 */
router.put("/:id", updateMasina);

/**
 * @swagger
 * /api/warehouse/dimMasina/{id}:
 *   delete:
 *     summary: Șterge o masina
 *     description: Șterge o masina specificată prin ID din baza de date.
 *     tags: [Warehouse - Masina]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul masinii (cod_masina).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Masina ștearsă cu succes.
 *       404:
 *         description: Masina nu a fost găsită.
 *       500:
 *         description: Eroare la ștergerea masinii.
 */
router.delete("/:id", deleteMasina);

module.exports = router;