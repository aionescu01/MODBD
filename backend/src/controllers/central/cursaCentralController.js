const CursaCentral = require("../../models/central/CursaCentral");

exports.createCursaCentral = async (req, res) => {
  try {
    const cursa = await CursaCentral.create(req.body);
    res.status(201).json(cursa);
  } catch (err) {
    console.error("Eroare la crearea cursa:", err.message);
    res.status(500).json({ error: "Eroare la crearea cursa", details: err.message });
  }
};

exports.getAllCurseCentral = async (req, res) => {
  try {
    const curse = await CursaCentral.findAll();
    res.status(200).json(curse);
  } catch (err) {
    console.error("Eroare la preluarea curse:", err.message);
    res.status(500).json({ error: "Eroare la preluarea curse", details: err.message });
  }
};

exports.getCursaCentralById = async (req, res) => {
  try {
    const cursa = await CursaCentral.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "CursaCentral nu s-a gasit" });
    res.status(200).json(cursa);
  } catch (err) {
    console.error("Eroare la preluarea cursa:", err.message);
    res.status(500).json({ error: "Eroare la preluarea cursa", details: err.message });
  }
};

exports.updateCursaCentral = async (req, res) => {
  try {
    const cursa = await CursaCentral.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "CursaCentral nu s-a gasit" });

    const updatedCursaCentral = await cursa.update(req.body);
    res.status(200).json(updatedCursaCentral);
  } catch (err) {
    console.error("Eroare la actualizarea cursa:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea cursa", details: err.message });
  }
};

exports.deleteCursaCentral = async (req, res) => {
  try {
    const cursa = await CursaCentral.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "CursaCentral nu s-a gasit" });

    await cursa.destroy();
    res.status(200).json({ message: "CursaCentral sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea cursa:", err.message);
    res.status(500).json({ error: "Eroare la stergerea cursa", details: err.message });
  }
};
