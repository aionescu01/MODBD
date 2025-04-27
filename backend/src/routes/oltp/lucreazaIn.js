const express = require("express");
const router = express.Router();
const { createLucreazaIn, getAllLucreazaIn, getLucreazaInById, updateLucreazaIn, deleteLucreazaIn } = require("../../controllers/oltp/lucreazaInController");

/**
 * @swagger
 * tags:
 *   name: OLTP - LucreazaIn
 *   description: API pentru gestionarea relațiilor angajaților cu locațiile de lucru
 */

/**
 * @swagger
 * /api/oltp/lucreazaIn:
 *   post:
 *     summary: Creează relația Angajat-Localitate
 *     description: Adaugă o nouă relație între un angajat și o locație în baza de date.
 *     tags: [OLTP - LucreazaIn]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cod_angajat:
 *                 type: integer
 *                 example: 1
 *               cod_locatie:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: Relația Angajat-Localitate creată cu succes.
 *       500:
 *         description: Eroare la crearea relației Angajat-Localitate.
 */
router.post("/", createLucreazaIn);

/**
 * @swagger
 * /api/oltp/lucreazaIn:
 *   get:
 *     summary: Preia toate relațiile Angajat-Localitate
 *     description: Returnează lista completă a relațiilor dintre angajați și locațiile lor din baza de date.
 *     tags: [OLTP - LucreazaIn]
 *     responses:
 *       200:
 *         description: Lista relațiilor Angajat-Localitate.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   cod_angajat:
 *                     type: integer
 *                     example: 1
 *                   cod_locatie:
 *                     type: integer
 *                     example: 2
 *       500:
 *         description: Eroare la preluarea relațiilor Angajat-Localitate.
 */
router.get("/", getAllLucreazaIn);

/**
 * @swagger
 * /api/oltp/lucreazaIn/{cod_angajat}/{cod_locatie}:
 *   get:
 *     summary: Preia relația Angajat-Localitate după chei primare
 *     description: Returnează detaliile unei relații Angajat-Localitate specificate prin cheile primare.
 *     tags: [OLTP - LucreazaIn]
 *     parameters:
 *       - name: cod_angajat
 *         in: path
 *         required: true
 *         description: Codul angajatului.
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: cod_locatie
 *         in: path
 *         required: true
 *         description: Codul locației.
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Relația găsită.
 *       404:
 *         description: Relația nu a fost găsită.
 *       500:
 *         description: Eroare la preluarea relației Angajat-Localitate.
 */
router.get("/:cod_angajat/:cod_locatie", getLucreazaInById);

/**
 * @swagger
 * /api/oltp/lucreazaIn/{cod_angajat}/{cod_locatie}:
 *   put:
 *     summary: Actualizează relația Angajat-Localitate
 *     description: Actualizează detaliile unei relații Angajat-Localitate specificate prin cheile primare.
 *     tags: [OLTP - LucreazaIn]
 *     parameters:
 *       - name: cod_angajat
 *         in: path
 *         required: true
 *         description: Codul angajatului.
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: cod_locatie
 *         in: path
 *         required: true
 *         description: Codul locației.
 *         schema:
 *           type: integer
 *           example: 2
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cod_angajat:
 *                 type: integer
 *                 example: 1
 *               cod_locatie:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Relația Angajat-Localitate actualizată cu succes.
 *       404:
 *         description: Relația nu a fost găsită.
 *       500:
 *         description: Eroare la actualizarea relației Angajat-Localitate.
 */
router.put("/:cod_angajat/:cod_locatie", updateLucreazaIn);

/**
 * @swagger
 * /api/oltp/lucreazaIn/{cod_angajat}/{cod_locatie}:
 *   delete:
 *     summary: Șterge relația Angajat-Localitate
 *     description: Șterge relația dintre un angajat și o locație din baza de date.
 *     tags: [OLTP - LucreazaIn]
 *     parameters:
 *       - name: cod_angajat
 *         in: path
 *         required: true
 *         description: Codul angajatului.
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: cod_locatie
 *         in: path
 *         required: true
 *         description: Codul locației.
 *         schema:
 *           type: integer
 *           example: 2
 *     responses:
 *       200:
 *         description: Relația ștearsă cu succes.
 *       404:
 *         description: Relația nu a fost găsită.
 *       500:
 *         description: Eroare la ștergerea relației Angajat-Localitate.
 */
router.delete("/:cod_angajat/:cod_locatie", deleteLucreazaIn);

module.exports = router;