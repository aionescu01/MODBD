const express = require("express");
const router = express.Router();
const { createLocatie, getAllLocatii, getLocatieById, updateLocatie, deleteLocatie } = require("../../controllers/warehouse/dimLocatieController");

/**
 * @swagger
 * tags:
 *   name: Warehouse - Locatie
 *   description: API pentru gestionarea locatiei
 */

/**
 * @swagger
 * /api/warehouse/dimLocatie:
 *   post:
 *     summary: Creează o locatie
 *     description: Adaugă o nouă locatie în baza de date.
 *     tags: [Warehouse - Locatie]
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
 *         description: Locatie creată cu succes.
 *       500:
 *         description: Eroare la crearea locatiei.
 */
router.post("/", createLocatie);

/**
 * @swagger
 * /api/warehouse/dimLocatie:
 *   get:
 *     summary: Preia toate locatiile
 *     description: Returnează lista completă a locatiilor din baza de date.
 *     tags: [Warehouse - Locatie]
 *     responses:
 *       200:
 *         description: Lista locatiilor.
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
 *         description: Eroare la preluarea locatiilor.
 */
router.get("/", getAllLocatii);

/**
 * @swagger
 * /api/warehouse/dimLocatie/{id}:
 *   get:
 *     summary: Preia locatie după ID
 *     description: Returnează detaliile unei locatii specificate prin ID.
 *     tags: [Warehouse - Locatie]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul locatii (cod_locatie).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Locatie găsită.
 *       404:
 *         description: Locatie nu a fost găsită.
 *       500:
 *         description: Eroare la preluarea locatiei.
 */
router.get("/:id", getLocatieById);

/**
 * @swagger
 * /api/warehouse/dimLocatie/{id}:
 *   put:
 *     summary: Actualizează o locatie
 *     description: Actualizează detaliile unei locatii specificate prin ID.
 *     tags: [Warehouse - Locatie]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul locatii (cod_locatie).
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
 *                 example: "Pitești"
 *               judet:
 *                 type: string
 *                 example: "Argeș"
 *     responses:
 *       200:
 *         description: Locatie actualizată cu succes.
 *       404:
 *         description: Locatie nu a fost găsită.
 *       500:
 *         description: Eroare la actualizarea locatiei.
 */
router.put("/:id", updateLocatie);

/**
 * @swagger
 * /api/warehouse/dimLocatie/{id}:
 *   delete:
 *     summary: Șterge o locatie
 *     description: Șterge o locatie specificată prin ID din baza de date.
 *     tags: [Warehouse - Locatie]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul locatii (cod_locatie).
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Locatie ștearsă cu succes.
 *       404:
 *         description: Locatie nu a fost găsită.
 *       500:
 *         description: Eroare la ștergerea locatiei.
 */
router.delete("/:id", deleteLocatie);

module.exports = router;