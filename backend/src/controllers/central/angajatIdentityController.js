const AngajatIdentity = require("../../models/central/AngajatIdentity");

exports.createAngajatIdentity = async (req, res) => {
  try {
    const angajatidentity = await AngajatIdentity.create(req.body);
    res.status(201).json(angajatidentity);
  } catch (err) {
    console.error("Eroare la crearea angajatidentity:", err.message);
    res.status(500).json({ error: "Eroare la crearea angajatidentity", details: err.message });
  }
};

exports.getAllAngajatIdentity = async (req, res) => {
  try {
    const angajatidentity = await AngajatIdentity.findAll();
    res.status(200).json(angajatidentity);
  } catch (err) {
    console.error("Eroare la preluarea angajatidentity:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajatidentity", details: err.message });
  }
};

exports.getAngajatIdentityById = async (req, res) => {
  try {
    const angajatidentity = await AngajatIdentity.findByPk(req.params.id);
    if (!angajatidentity) return res.status(404).json({ error: "AngajatIdentity nu s-a gasit" });
    res.status(200).json(angajatidentity);
  } catch (err) {
    console.error("Eroare la preluarea angajatidentity:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajatidentity", details: err.message });
  }
};

exports.updateAngajatIdentity = async (req, res) => {
  try {
    const angajatidentity = await AngajatIdentity.findByPk(req.params.id);
    if (!angajatidentity) return res.status(404).json({ error: "AngajatIdentity nu s-a gasit" });

    const updatedAngajatIdentity = await angajatidentity.update(req.body);
    res.status(200).json(updatedAngajatIdentity);
  } catch (err) {
    console.error("Eroare la actualizarea angajatidentity:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea angajatidentity", details: err.message });
  }
};

exports.deleteAngajatIdentity = async (req, res) => {
  try {
    const angajatidentity = await AngajatIdentity.findByPk(req.params.id);
    if (!angajatidentity) return res.status(404).json({ error: "AngajatIdentity nu s-a gasit" });

    await angajatidentity.destroy();
    res.status(200).json({ message: "AngajatIdentity sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea angajatidentity:", err.message);
    res.status(500).json({ error: "Eroare la stergerea angajatidentity", details: err.message });
  }
};
