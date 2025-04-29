const LocatiiNord = require("../../models/nord/LocatiiNord");

exports.createLocatiiNord = async (req, res) => {
  try {
    const locatii = await LocatiiNord.create(req.body);
    res.status(201).json(locatii);
  } catch (err) {
    console.error("Eroare la crearea locatii:", err.message);
    res.status(500).json({ error: "Eroare la crearea locatii", details: err.message });
  }
};

exports.getAllLocatiiNord = async (req, res) => {
  try {
    const locatii = await LocatiiNord.findAll();
    res.status(200).json(locatii);
  } catch (err) {
    console.error("Eroare la preluarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatii", details: err.message });
  }
};

exports.getLocatiiNordById = async (req, res) => {
  try {
    const locatii = await LocatiiNord.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "LocatiiNord nu s-a gasit" });
    res.status(200).json(locatii);
  } catch (err) {
    console.error("Eroare la preluarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatii", details: err.message });
  }
};

exports.updateLocatiiNord = async (req, res) => {
  try {
    const locatii = await LocatiiNord.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "LocatiiNord nu s-a gasit" });

    const updatedLocatiiNord = await locatii.update(req.body);
    res.status(200).json(updatedLocatiiNord);
  } catch (err) {
    console.error("Eroare la actualizarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea locatii", details: err.message });
  }
};

exports.deleteLocatiiNord = async (req, res) => {
  try {
    const locatii = await LocatiiNord.findByPk(req.params.id);
    if (!locatii) return res.status(404).json({ error: "LocatiiNord nu s-a gasit" });

    await locatii.destroy();
    res.status(200).json({ message: "LocatiiNord sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea locatii:", err.message);
    res.status(500).json({ error: "Eroare la stergerea locatii", details: err.message });
  }
};
