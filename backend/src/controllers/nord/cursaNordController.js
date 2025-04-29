const CursaNord = require("../../models/nord/CursaNord");

exports.createCursaNord = async (req, res) => {
  try {
    const cursa = await CursaNord.create(req.body);
    res.status(201).json(cursa);
  } catch (err) {
    console.error("Eroare la crearea cursa:", err.message);
    res.status(500).json({ error: "Eroare la crearea cursa", details: err.message });
  }
};

exports.getAllCurseNord = async (req, res) => {
  try {
    const curse = await CursaNord.findAll();
    res.status(200).json(curse);
  } catch (err) {
    console.error("Eroare la preluarea curse:", err.message);
    res.status(500).json({ error: "Eroare la preluarea curse", details: err.message });
  }
};

exports.getCursaNordById = async (req, res) => {
  try {
    const cursa = await CursaNord.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "CursaNord nu s-a gasit" });
    res.status(200).json(cursa);
  } catch (err) {
    console.error("Eroare la preluarea cursa:", err.message);
    res.status(500).json({ error: "Eroare la preluarea cursa", details: err.message });
  }
};

exports.updateCursaNord = async (req, res) => {
  try {
    const cursa = await CursaNord.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "CursaNord nu s-a gasit" });

    const updatedCursaNord = await cursa.update(req.body);
    res.status(200).json(updatedCursaNord);
  } catch (err) {
    console.error("Eroare la actualizarea cursa:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea cursa", details: err.message });
  }
};

exports.deleteCursaNord = async (req, res) => {
  try {
    const cursa = await CursaNord.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "CursaNord nu s-a gasit" });

    await cursa.destroy();
    res.status(200).json({ message: "CursaNord sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea cursa:", err.message);
    res.status(500).json({ error: "Eroare la stergerea cursa", details: err.message });
  }
};
