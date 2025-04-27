const Locatii = require("../../models/oltp/Locatii");

exports.createLocatii = async (req, res) => {
  try {
    const locatii = await Locatii.create(req.body);
    res.status(201).json(locatii);
  } catch (err) {
    console.error("Eroare la crearea locatii:", err.message);
    res.status(500).json({ error: "Eroare la crearea locatii", details: err.message });
  }
};

exports.getAllLocatii = async (req, res) => {
  try {
    const locatii = await Locatii.findAll();
    res.status(200).json(locatii);
  } catch (err) {
    console.error("Eroare la preluarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatii", details: err.message });
  }
};

exports.getLocatiiById = async (req, res) => {
  try {
    const locatii = await Locatii.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "Locatii nu s-a gasit" });
    res.status(200).json(locatii);
  } catch (err) {
    console.error("Eroare la preluarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatii", details: err.message });
  }
};

exports.updateLocatii = async (req, res) => {
  try {
    const locatii = await Locatii.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "Locatii nu s-a gasit" });

    const updatedLocatii = await locatii.update(req.body);
    res.status(200).json(updatedLocatii);
  } catch (err) {
    console.error("Eroare la actualizarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea locatii", details: err.message });
  }
};

exports.deleteLocatii = async (req, res) => {
  try {
    const locatii = await Locatii.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "Locatii nu s-a gasit" });

    await locatii.destroy();
    res.status(200).json({ message: "Locatii sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea locatii:", err.message);
    res.status(500).json({ error: "Eroare la stergerea locatii", details: err.message });
  }
};
