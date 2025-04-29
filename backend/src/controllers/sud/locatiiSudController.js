const LocatiiSud = require("../../models/sud/LocatiiSud");

exports.createLocatiiSud = async (req, res) => {
  try {
    const locatii = await LocatiiSud.create(req.body);
    res.status(201).json(locatii);
  } catch (err) {
    console.error("Eroare la crearea locatii:", err.message);
    res.status(500).json({ error: "Eroare la crearea locatii", details: err.message });
  }
};

exports.getAllLocatiiSud = async (req, res) => {
  try {
    const locatii = await LocatiiSud.findAll();
    res.status(200).json(locatii);
  } catch (err) {
    console.error("Eroare la preluarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatii", details: err.message });
  }
};

exports.getLocatiiSudById = async (req, res) => {
  try {
    const locatii = await LocatiiSud.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "LocatiiSud nu s-a gasit" });
    res.status(200).json(locatii);
  } catch (err) {
    console.error("Eroare la preluarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatii", details: err.message });
  }
};

exports.updateLocatiiSud = async (req, res) => {
  try {
    const locatii = await LocatiiSud.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "LocatiiSud nu s-a gasit" });

    const updatedLocatiiSud = await locatii.update(req.body);
    res.status(200).json(updatedLocatiiSud);
  } catch (err) {
    console.error("Eroare la actualizarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea locatii", details: err.message });
  }
};

exports.deleteLocatiiSud = async (req, res) => {
  try {
    const locatii = await LocatiiSud.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "LocatiiSud nu s-a gasit" });

    await locatii.destroy();
    res.status(200).json({ message: "LocatiiSud sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea locatii:", err.message);
    res.status(500).json({ error: "Eroare la stergerea locatii", details: err.message });
  }
};
