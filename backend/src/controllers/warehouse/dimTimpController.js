const DimTimp = require("../../models/warehouse/DimTimp");

exports.createTimp = async (req, res) => {
  try {
    const timp = await DimTimp.create(req.body);
    res.status(201).json(timp);
  } catch (err) {
    console.error("Eroare la crearea timp:", err.message);
    res.status(500).json({ error: "Eroare la crearea timp", details: err.message });
  }
};

exports.getAllTimp = async (req, res) => {
  try {
    const timpuri = await DimTimp.findAll();
    res.status(200).json(timpuri);
  } catch (err) {
    console.error("Eroare la preluarea timpuri:", err.message);
    res.status(500).json({ error: "Eroare la preluarea timpuri", details: err.message });
  }
};

exports.getTimpById = async (req, res) => {
  try {
    const timp = await DimTimp.findByPk(req.params.id);
    if (!timp) return res.status(404).json({ error: "Timp nu s-a gasit" });
    res.status(200).json(timp);
  } catch (err) {
    console.error("Eroare la preluarea timp:", err.message);
    res.status(500).json({ error: "Eroare la preluarea timp", details: err.message });
  }
};

exports.updateTimp = async (req, res) => {
  try {
    const timp = await DimTimp.findByPk(req.params.id);
    if (!timp) return res.status(404).json({ error: "Timp nu s-a gasit" });

    const updatedTimp = await timp.update(req.body);
    res.status(200).json(updatedTimp);
  } catch (err) {
    console.error("Eroare la actualizarea timp:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea timp", details: err.message });
  }
};

exports.deleteTimp = async (req, res) => {
  try {
    const timp = await DimTimp.findByPk(req.params.id);
    if (!timp) return res.status(404).json({ error: "Timp nu s-a gasit" });

    await timp.destroy();
    res.status(200).json({ message: "Timp sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea timp:", err.message);
    res.status(500).json({ error: "Eroare la stergerea timp", details: err.message });
  }
};
