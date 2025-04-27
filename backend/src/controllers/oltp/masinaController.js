const Masina = require("../../models/oltp/Masina");

exports.createMasina = async (req, res) => {
  try {
    const masina = await Masina.create(req.body);
    res.status(201).json(masina);
  } catch (err) {
    console.error("Eroare la crearea masina:", err.message);
    res.status(500).json({ error: "Eroare la crearea masina", details: err.message });
  }
};

exports.getAllMasini = async (req, res) => {
  try {
    const masini = await Masina.findAll();
    res.status(200).json(masini);
  } catch (err) {
    console.error("Eroare la preluarea masinai:", err.message);
    res.status(500).json({ error: "Eroare la preluarea masini", details: err.message });
  }
};

exports.getMasinaById = async (req, res) => {
  try {
    const masina = await Masina.findByPk(req.params.id);
    if (!masina) return res.status(404).json({ error: "Masina nu s-a gasit" });
    res.status(200).json(masina);
  } catch (err) {
    console.error("Eroare la preluarea masina:", err.message);
    res.status(500).json({ error: "Eroare la preluarea masina", details: err.message });
  }
};

exports.updateMasina = async (req, res) => {
  try {
    const masina = await Masina.findByPk(req.params.id);
    if (!masina) return res.status(404).json({ error: "Masina nu s-a gasit" });

    const updatedMasina = await masina.update(req.body);
    res.status(200).json(updatedMasina);
  } catch (err) {
    console.error("Eroare la actualizarea masina:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea masina", details: err.message });
  }
};

exports.deleteMasina = async (req, res) => {
  try {
    const masina = await Masina.findByPk(req.params.id);
    if (!masina) return res.status(404).json({ error: "Masina nu s-a gasit" });

    await masina.destroy();
    res.status(200).json({ message: "Masina sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea masina:", err.message);
    res.status(500).json({ error: "Eroare la stergerea masina", details: err.message });
  }
};
