const LocatiiCentral = require("../../models/central/LocatiiCentral");

exports.createLocatiiCentral = async (req, res) => {
  try {
    const locatii = await LocatiiCentral.create(req.body);
    res.status(201).json(locatii);
  } catch (err) {
    console.error("Eroare la crearea locatii:", err.message);
    res.status(500).json({ error: "Eroare la crearea locatii", details: err.message });
  }
};

exports.getAllLocatiiCentral = async (req, res) => {
  try {
    const locatii = await LocatiiCentral.findAll();
    res.status(200).json(locatii);
  } catch (err) {
    console.error("Eroare la preluarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatii", details: err.message });
  }
};

exports.getLocatiiCentralById = async (req, res) => {
  try {
    const locatii = await LocatiiCentral.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "LocatiiCentral nu s-a gasit" });
    res.status(200).json(locatii);
  } catch (err) {
    console.error("Eroare la preluarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatii", details: err.message });
  }
};

exports.updateLocatiiCentral = async (req, res) => {
  try {
    const locatii = await LocatiiCentral.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "LocatiiCentral nu s-a gasit" });

    const updatedLocatiiCentral = await locatii.update(req.body);
    res.status(200).json(updatedLocatiiCentral);
  } catch (err) {
    console.error("Eroare la actualizarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea locatii", details: err.message });
  }
};

exports.deleteLocatiiCentral = async (req, res) => {
  try {
    const locatii = await LocatiiCentral.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "LocatiiCentral nu s-a gasit" });

    await locatii.destroy();
    res.status(200).json({ message: "LocatiiCentral sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea locatii:", err.message);
    res.status(500).json({ error: "Eroare la stergerea locatii", details: err.message });
  }
};
