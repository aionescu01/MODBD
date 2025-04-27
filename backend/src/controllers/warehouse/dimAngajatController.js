const DimAngajat = require("../../models/warehouse/DimAngajat");

exports.createAngajat = async (req, res) => {
  try {
    const angajat = await DimAngajat.create(req.body);
    res.status(201).json(angajat);
  } catch (err) {
    console.error("Eroare la crearea angajat:", err.message);
    res.status(500).json({ error: "Eroare la crearea angajat", details: err.message });
  }
};

exports.getAllAngajati = async (req, res) => {
  try {
    const angajati = await DimAngajat.findAll();
    res.status(200).json(angajati);
  } catch (err) {
    console.error("Eroare la preluarea angajati:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajati", details: err.message });
  }
};

exports.getAngajatById = async (req, res) => {
  try {
    const angajat = await DimAngajat.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "Angajat nu s-a gasit" });
    res.status(200).json(angajat);
  } catch (err) {
    console.error("Eroare la preluarea angajat:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajat", details: err.message });
  }
};

exports.updateAngajat = async (req, res) => {
  try {
    const angajat = await DimAngajat.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "Angajat nu s-a gasit" });

    const updatedAngajat = await angajat.update(req.body);
    res.status(200).json(updatedAngajat);
  } catch (err) {
    console.error("Eroare la actualizarea angajat:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea angajat", details: err.message });
  }
};

exports.deleteAngajat = async (req, res) => {
  try {
    const angajat = await DimAngajat.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "Angajat nu s-a gasit" });

    await angajat.destroy();
    res.status(200).json({ message: "Angajat sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea angajat:", err.message);
    res.status(500).json({ error: "Eroare la stergerea angajat", details: err.message });
  }
};
