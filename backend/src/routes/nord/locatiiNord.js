const express = require("express");
const router = express.Router();
const { createLocatiiNord, getAllLocatiiNord, getLocatiiNordById, updateLocatiiNord, deleteLocatiiNord } = require("../../controllers/nord/locatiiNordController");

/**
 * @swagger
 * tags:
 *   name: NORD - Locatii
 *   description: API pentru gestionarea locațiilor
 */

/**
 * @swagger
 * /api/nord/locatiiNord:
 *   post:
 *     summary: Creează locația
 *     description: Adaugă o nouă locație în baza de date.
 *     tags: [NORD - Locatii]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               localitate:
 *                 type: string
 *                 example: "București"
 *               judet:
 *                 type: string
 *                 example: "Ilfov"
 *     responses:
 *       201:
 *         description: Locația creată cu succes.
 *       500:
 *         description: Eroare la crearea locației.
 */
router.post("/", createLocatiiNord);

/**
 * @swagger
 * /api/nord/locatiiNord:
 *   get:
 *     summary: Preia toate locațiile
 *     description: Returnează lista completă a locațiilor din baza de date.
 *     tags: [NORD - Locatii]
 *     responses:
 *       200:
 *         description: Lista locațiilor.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cod_locatie:
 *                     type: integer
 *                     example: 1
 *                   localitate:
 *                     type: string
 *                     example: "București"
 *                   judet:
 *                     type: string
 *                     example: "Ilfov"
 *       500:
 *         description: Eroare la preluarea locațiilor.
 */
router.get("/", getAllLocatiiNord);

/**
 * @swagger
 * /api/nord/locatiiNord/{id}:
 *   get:
 *     summary: Preia locația după ID
 *     description: Returnează detaliile unei locații specificate prin ID.
 *     tags: [NORD - Locatii]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul locației.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Locația găsită.
 *       404:
 *         description: Locația nu a fost găsită.
 *       500:
 *         description: Eroare la preluarea locației.
 */
router.get("/:id", getLocatiiNordById);

/**
 * @swagger
 * /api/nord/locatiiNord/{id}:
 *   put:
 *     summary: Actualizează locația
 *     description: Actualizează detaliile unei locații specificate prin ID.
 *     tags: [NORD - Locatii]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul locației.
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
 *               localitate:
 *                 type: string
 *                 example: "Cluj-Napoca"
 *               judet:
 *                 type: string
 *                 example: "Cluj"
 *     responses:
 *       200:
 *         description: Locația actualizată cu succes.
 *       404:
 *         description: Locația nu a fost găsită.
 *       500:
 *         description: Eroare la actualizarea locației.
 */
router.put("/:id", updateLocatiiNord);

/**
 * @swagger
 * /api/nord/locatiiNord/{id}:
 *   delete:
 *     summary: Șterge locația
 *     description: Șterge locația specificată prin ID din baza de date.
 *     tags: [NORD - Locatii]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul locației.
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Locația ștersă cu succes.
 *       404:
 *         description: Locația nu a fost găsită.
 *       500:
 *         description: Eroare la ștergerea locației.
 */
router.delete("/:id", deleteLocatiiNord);

module.exports = router;