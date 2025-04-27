const Cursa = require("../../models/oltp/Cursa");

exports.createCursa = async (req, res) => {
  try {
    const cursa = await Cursa.create(req.body);
    res.status(201).json(cursa);
  } catch (err) {
    console.error("Eroare la crearea cursa:", err.message);
    res.status(500).json({ error: "Eroare la crearea cursa", details: err.message });
  }
};

exports.getAllCurse = async (req, res) => {
  try {
    const curse = await Cursa.findAll();
    res.status(200).json(curse);
  } catch (err) {
    console.error("Eroare la preluarea curse:", err.message);
    res.status(500).json({ error: "Eroare la preluarea curse", details: err.message });
  }
};

exports.getCursaById = async (req, res) => {
  try {
    const cursa = await Cursa.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "Cursa nu s-a gasit" });
    res.status(200).json(cursa);
  } catch (err) {
    console.error("Eroare la preluarea cursa:", err.message);
    res.status(500).json({ error: "Eroare la preluarea cursa", details: err.message });
  }
};

exports.updateCursa = async (req, res) => {
  try {
    const cursa = await Cursa.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "Cursa nu s-a gasit" });

    const updatedCursa = await cursa.update(req.body);
    res.status(200).json(updatedCursa);
  } catch (err) {
    console.error("Eroare la actualizarea cursa:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea cursa", details: err.message });
  }
};

exports.deleteCursa = async (req, res) => {
  try {
    const cursa = await Cursa.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "Cursa nu s-a gasit" });

    await cursa.destroy();
    res.status(200).json({ message: "Cursa sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea cursa:", err.message);
    res.status(500).json({ error: "Eroare la stergerea cursa", details: err.message });
  }
};
