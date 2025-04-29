const AngajatSud = require("../../models/sud/AngajatSud");

exports.createAngajatSud = async (req, res) => {
  try {
    const angajat = await AngajatSud.create(req.body);
    res.status(201).json(angajat);
  } catch (err) {
    console.error("Eroare la crearea angajat:", err.message);
    res.status(500).json({ error: "Eroare la crearea angajat", details: err.message });
  }
};

exports.getAllAngajatiSud = async (req, res) => {
  try {
    const angajati = await AngajatSud.findAll();
    res.status(200).json(angajati);
  } catch (err) {
    console.error("Eroare la preluarea angajati:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajati", details: err.message });
  }
};

exports.getAngajatSudById = async (req, res) => {
  try {
    const angajat = await AngajatSud.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "AngajatSud nu s-a gasit" });
    res.status(200).json(angajat);
  } catch (err) {
    console.error("Eroare la preluarea angajat:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajat", details: err.message });
  }
};

exports.updateAngajatSud = async (req, res) => {
  try {
    const angajat = await AngajatSud.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "AngajatSud nu s-a gasit" });

    const updatedAngajatSud = await angajat.update(req.body);
    res.status(200).json(updatedAngajatSud);
  } catch (err) {
    console.error("Eroare la actualizarea angajat:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea angajat", details: err.message });
  }
};

exports.deleteAngajatSud = async (req, res) => {
  try {
    const angajat = await AngajatSud.findByPk(req.params.id);
    if (!angajat) return res.status(404).json({ error: "AngajatSud nu s-a gasit" });

    await angajat.destroy();
    res.status(200).json({ message: "AngajatSud sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea angajat:", err.message);
    res.status(500).json({ error: "Eroare la stergerea angajat", details: err.message });
  }
};
