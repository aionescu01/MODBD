const DimLocatie = require("../../models/warehouse/DimLocatie");

exports.createLocatie = async (req, res) => {
  try {
    const locatie = await DimLocatie.create(req.body);
    res.status(201).json(locatie);
  } catch (err) {
    console.error("Eroare la crearea locatie:", err.message);
    res.status(500).json({ error: "Eroare la crearea locatie", details: err.message });
  }
};

exports.getAllLocatii = async (req, res) => {
  try {
    const locatii = await DimLocatie.findAll();
    res.status(200).json(locatii);
  } catch (err) {
    console.error("Eroare la preluarea locatii:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatii", details: err.message });
  }
};

exports.getLocatieById = async (req, res) => {
  try {
    const locatie = await DimLocatie.findByPk(req.params.id);
    if (!locatie) return res.status(404).json({ error: "Locatie nu s-a gasit" });
    res.status(200).json(locatie);
  } catch (err) {
    console.error("Eroare la preluarea locatie:", err.message);
    res.status(500).json({ error: "Eroare la preluarea locatie", details: err.message });
  }
};

exports.updateLocatie = async (req, res) => {
  try {
    const locatie = await DimLocatie.findByPk(req.params.id);
    if (!locatie) return res.status(404).json({ error: "Locatie nu s-a gasit" });

    const updatedLocatie = await locatie.update(req.body);
    res.status(200).json(updatedLocatie);
  } catch (err) {
    console.error("Eroare la actualizarea locatie:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea locatie", details: err.message });
  }
};

exports.deleteLocatie = async (req, res) => {
  try {
    const locatie = await DimLocatie.findByPk(req.params.id);
    if (!locatie) return res.status(404).json({ error: "Locatie nu s-a gasit" });

    await locatie.destroy();
    res.status(200).json({ message: "Locatie sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea locatie:", err.message);
    res.status(500).json({ error: "Eroare la stergerea locatie", details: err.message });
  }
};
