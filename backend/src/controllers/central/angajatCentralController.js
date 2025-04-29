const AngajatCentral = require("../../models/central/AngajatCentral");

exports.createAngajatCentral = async (req, res) => {
  try {
    const angajat = await AngajatCentral.create(req.body);
    res.status(201).json(angajat);
  } catch (err) {
    console.error("Eroare la crearea angajat:", err.message);
    res.status(500).json({ error: "Eroare la crearea angajat", details: err.message });
  }
};

exports.getAllAngajatiCentral = async (req, res) => {
  try {
    const angajati = await AngajatCentral.findAll();
    res.status(200).json(angajati);
  } catch (err) {
    console.error("Eroare la preluarea angajati:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajati", details: err.message });
  }
};

exports.getAngajatCentralById = async (req, res) => {
  try {
    const angajat = await AngajatCentral.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "AngajatCentral nu s-a gasit" });
    res.status(200).json(angajat);
  } catch (err) {
    console.error("Eroare la preluarea angajat:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajat", details: err.message });
  }
};

exports.updateAngajatCentral = async (req, res) => {
  try {
    const angajat = await AngajatCentral.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "AngajatCentral nu s-a gasit" });

    const updatedAngajatCentral = await angajat.update(req.body);
    res.status(200).json(updatedAngajatCentral);
  } catch (err) {
    console.error("Eroare la actualizarea angajat:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea angajat", details: err.message });
  }
};

exports.deleteAngajatCentral = async (req, res) => {
  try {
    const angajat = await AngajatCentral.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "AngajatCentral nu s-a gasit" });

    await angajat.destroy();
    res.status(200).json({ message: "AngajatCentral sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea angajat:", err.message);
    res.status(500).json({ error: "Eroare la stergerea angajat", details: err.message });
  }
};
