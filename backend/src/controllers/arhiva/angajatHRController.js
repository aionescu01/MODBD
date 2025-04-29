const AngajatHR = require("../../models/arhiva/AngajatHR");

exports.createAngajatHR = async (req, res) => {
  try {
    const angajathr = await AngajatHR.create(req.body);
    res.status(201).json(angajathr);
  } catch (err) {
    console.error("Eroare la crearea angajathr:", err.message);
    res.status(500).json({ error: "Eroare la crearea angajathr", details: err.message });
  }
};

exports.getAllAngajatiHR = async (req, res) => {
  try {
    const angajatihr = await AngajatHR.findAll();
    res.status(200).json(angajatihr);
  } catch (err) {
    console.error("Eroare la preluarea angajatihr:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajatihr", details: err.message });
  }
};

exports.getAngajatHRById = async (req, res) => {
  try {
    const angajathr = await AngajatHR.findByPk(req.params.id);
    if (!angajathr) return res.status(404).json({ error: "AngajatHR nu s-a gasit" });
    res.status(200).json(angajathr);
  } catch (err) {
    console.error("Eroare la preluarea angajathr:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajathr", details: err.message });
  }
};

exports.updateAngajatHR = async (req, res) => {
  try {
    const angajathr = await AngajatHR.findByPk(req.params.id);
    if (!angajathr) return res.status(404).json({ error: "AngajatHR nu s-a gasit" });

    const updatedAngajatHR = await angajathr.update(req.body);
    res.status(200).json(updatedAngajatHR);
  } catch (err) {
    console.error("Eroare la actualizarea angajathr:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea angajathr", details: err.message });
  }
};

exports.deleteAngajatHR = async (req, res) => {
  try {
    const angajathr = await AngajatHR.findByPk(req.params.id);
    if (!angajathr) return res.status(404).json({ error: "AngajatHR nu s-a gasit" });

    await angajathr.destroy();
    res.status(200).json({ message: "AngajatHR sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea angajathr:", err.message);
    res.status(500).json({ error: "Eroare la stergerea angajathr", details: err.message });
  }
};
