const AngajatContactSud = require("../../models/sud/AngajatContactSud");

exports.createAngajatContact = async (req, res) => {
  try {
    const angajatcontact = await AngajatContactSud.create(req.body);
    res.status(201).json(angajatcontact);
  } catch (err) {
    console.error("Eroare la crearea angajatcontact:", err.message);
    res.status(500).json({ error: "Eroare la crearea angajatcontact", details: err.message });
  }
};

exports.getAllAngajatContact = async (req, res) => {
  try {
    const angajatcontact = await AngajatContactSud.findAll();
    res.status(200).json(angajatcontact);
  } catch (err) {
    console.error("Eroare la preluarea angajatcontact:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajatcontact", details: err.message });
  }
};

exports.getAngajatContactById = async (req, res) => {
  try {
    const angajatcontact = await AngajatContactSud.findByPk(req.params.id);
    if (!angajatcontact) return res.status(404).json({ error: "AngajatContact nu s-a gasit" });
    res.status(200).json(angajatcontact);
  } catch (err) {
    console.error("Eroare la preluarea angajatcontact:", err.message);
    res.status(500).json({ error: "Eroare la preluarea angajatcontact", details: err.message });
  }
};

exports.updateAngajatContact = async (req, res) => {
  try {
    const angajatcontact = await AngajatContactSud.findByPk(req.params.id);
    if (!angajatcontact) return res.status(404).json({ error: "AngajatContact nu s-a gasit" });

    const updatedAngajatContact = await angajatcontact.update(req.body);
    res.status(200).json(updatedAngajatContact);
  } catch (err) {
    console.error("Eroare la actualizarea angajatcontact:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea angajatcontact", details: err.message });
  }
};

exports.deleteAngajatContact = async (req, res) => {
  try {
    const angajatcontact = await AngajatContactSud.findByPk(req.params.id);
    if (!angajatcontact) return res.status(404).json({ error: "AngajatContact nu s-a gasit" });

    await angajatcontact.destroy();
    res.status(200).json({ message: "AngajatContact sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea angajatcontact:", err.message);
    res.status(500).json({ error: "Eroare la stergerea angajatcontact", details: err.message });
  }
};
