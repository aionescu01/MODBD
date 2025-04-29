const CursaSud = require("../../models/sud/CursaSud");

exports.createCursaSud = async (req, res) => {
  try {
    const cursa = await CursaSud.create(req.body);
    res.status(201).json(cursa);
  } catch (err) {
    console.error("Eroare la crearea cursa:", err.message);
    res.status(500).json({ error: "Eroare la crearea cursa", details: err.message });
  }
};

exports.getAllCurseSud = async (req, res) => {
  try {
    const curse = await CursaSud.findAll();
    res.status(200).json(curse);
  } catch (err) {
    console.error("Eroare la preluarea curse:", err.message);
    res.status(500).json({ error: "Eroare la preluarea curse", details: err.message });
  }
};

exports.getCursaSudById = async (req, res) => {
  try {
    const cursa = await CursaSud.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "CursaSud nu s-a gasit" });
    res.status(200).json(cursa);
  } catch (err) {
    console.error("Eroare la preluarea cursa:", err.message);
    res.status(500).json({ error: "Eroare la preluarea cursa", details: err.message });
  }
};

exports.updateCursaSud = async (req, res) => {
  try {
    const cursa = await CursaSud.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "CursaSud nu s-a gasit" });

    const updatedCursaSud = await cursa.update(req.body);
    res.status(200).json(updatedCursaSud);
  } catch (err) {
    console.error("Eroare la actualizarea cursa:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea cursa", details: err.message });
  }
};

exports.deleteCursaSud = async (req, res) => {
  try {
    const cursa = await CursaSud.findByPk(req.params.id);
    if (!cursa) return res.status(404).json({ error: "CursaSud nu s-a gasit" });

    await cursa.destroy();
    res.status(200).json({ message: "CursaSud sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea cursa:", err.message);
    res.status(500).json({ error: "Eroare la stergerea cursa", details: err.message });
  }
};
