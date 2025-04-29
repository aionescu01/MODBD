const express = require("express");
const router = express.Router();
const { createCursaSud, getAllCurseSud, getCursaSudById, updateCursaSud, deleteCursaSud } = require("../../controllers/sud/cursaSudController");

/**
 * @swagger
 * tags:
 *   name: SUD - Curse
 *   description: API pentru gestionarea curselor
 */

/**
 * @swagger
 * /api/sud/cursaSud:
 *   post:
 *     summary: Creează o cursă
 *     description: Adaugă o nouă cursă în baza de date.
 *     tags: [SUD - Curse]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cod_masina:
 *                 type: integer
 *                 example: 1
 *               cod_sofer:
 *                 type: integer
 *                 example: 2
 *               cod_client:
 *                 type: integer
 *                 example: 3
 *               adresa_client:
 *                 type: string
 *                 example: "Strada Exemplu 1"
 *               destinatie:
 *                 type: string
 *                 example: "Destinatia Exemplu"
 *               cod_locatie:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Cursa creată cu succes.
 *       500:
 *         description: Eroare la crearea cursei.
 */
router.post("/", createCursaSud);

/**
 * @swagger
 * /api/sud/cursaSud:
 *   get:
 *     summary: Preia toate cursele
 *     description: Returnează lista completă a curselor din baza de date.
 *     tags: [SUD - Curse]
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
 *                   cod_cursaSud:
 *                     type: integer
 *                     example: 1
 *                   cod_masina:
 *                     type: integer
 *                     example: 1
 *                   cod_sofer:
 *                     type: integer
 *                     example: 2
 *                   cod_client:
 *                     type: integer
 *                     example: 3
 *                   adresa_client:
 *                     type: string
 *                     example: "Strada Exemplu 1"
 *                   destinatie:
 *                     type: string
 *                     example: "Destinatia Exemplu"
 *                   cod_locatie:
 *                     type: integer
 *                     example: 10
 *       500:
 *         description: Eroare la preluarea curselor.
 */
router.get("/", getAllCurseSud);

/**
 * @swagger
 * /api/sud/cursaSud/{id}:
 *   get:
 *     summary: Preia o cursă după ID
 *     description: Returnează datele unei curse specifice prin ID.
 *     tags: [SUD - Curse]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul cursei.
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
router.get("/:id", getCursaSudById);

/**
 * @swagger
 * /api/sud/cursaSud/{id}:
 *   put:
 *     summary: Actualizează o cursă
 *     description: Actualizează datele unei curse specifice prin ID.
 *     tags: [SUD - Curse]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul cursei.
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
 *               cod_masina:
 *                 type: integer
 *                 example: 1
 *               cod_sofer:
 *                 type: integer
 *                 example: 2
 *               cod_client:
 *                 type: integer
 *                 example: 3
 *               adresa_client:
 *                 type: string
 *                 example: "Strada Modificata 1"
 *               destinatie:
 *                 type: string
 *                 example: "Destinatia Modificata"
 *               cod_locatie:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Cursa actualizată cu succes.
 *       404:
 *         description: Cursa nu a fost găsită.
 *       500:
 *         description: Eroare la actualizarea cursei.
 */
router.put("/:id", updateCursaSud);

/**
 * @swagger
 * /api/sud/cursaSud/{id}:
 *   delete:
 *     summary: Șterge o cursă
 *     description: Șterge o cursă specificată prin ID din baza de date.
 *     tags: [SUD - Curse]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID-ul cursei.
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
router.delete("/:id", deleteCursaSud);

module.exports = router;