const AngajatNord = require("../../models/nord/AngajatNord");

exports.createAngajatNord = async (req, res) => {
  try {
    const angajat = await AngajatNord.create(req.body);
    res.status(201).json(angajat);
  } catch (err) {
    console.error("Eroare la crearea angajat:", err.message);
    res.status(500).json({ error: "Eroare la crearea angajat", details: err.message });
  }
};

exports.getAllAngajatiNord = async (req, res) => {
  try {
    const angajati = await AngajatNord.findAll();
    res.status(200).json(angajati);
  } catch (err) {
    console.error("Eroare la preluarea angajati:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajati", details: err.message });
  }
};

exports.getAngajatNordById = async (req, res) => {
  try {
    const angajat = await AngajatNord.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "AngajatNord nu s-a gasit" });
    res.status(200).json(angajat);
  } catch (err) {
    console.error("Eroare la preluarea angajat:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajat", details: err.message });
  }
};

exports.updateAngajatNord = async (req, res) => {
  try {
    const angajat = await AngajatNord.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "AngajatNord nu s-a gasit" });

    const updatedAngajatNord = await angajat.update(req.body);
    res.status(200).json(updatedAngajatNord);
  } catch (err) {
    console.error("Eroare la actualizarea angajat:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea angajat", details: err.message });
  }
};

exports.deleteAngajatNord = async (req, res) => {
  try {
    const angajat = await AngajatNord.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "AngajatNord nu s-a gasit" });

    await angajat.destroy();
    res.status(200).json({ message: "AngajatNord sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea angajat:", err.message);
    res.status(500).json({ error: "Eroare la stergerea angajat", details: err.message });
  }
};
