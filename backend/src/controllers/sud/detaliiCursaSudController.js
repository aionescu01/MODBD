const DetaliiCursaSud = require("../../models/sud/DetaliiCursaSud");

exports.createDetaliiCursaSud = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaSud.create(req.body);
    res.status(201).json(detaliicursa);
  } catch (err) {
    console.error("Eroare la crearea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la crearea detaliicursa", details: err.message });
  }
};

exports.getAllDetaliiCurseSud = async (req, res) => {
  try {
    const detaliicurse = await DetaliiCursaSud.findAll();
    res.status(200).json(detaliicurse);
  } catch (err) {
    console.error("Eroare la preluarea detaliicurse:", err.message);
    res.status(500).json({ error: "Eroare la preluarea detaliicurse", details: err.message });
  }
};

exports.getDetaliiCursaSudById = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaSud.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursaSud nu s-a gasit" });
    res.status(200).json(detaliicursa);
  } catch (err) {
    console.error("Eroare la preluarea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la preluarea detaliicursa", details: err.message });
  }
};

exports.updateDetaliiCursaSud = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaSud.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursaSud nu s-a gasit" });

    const updatedDetaliiCursaSud = await detaliicursa.update(req.body);
    res.status(200).json(updatedDetaliiCursaSud);
  } catch (err) {
    console.error("Eroare la actualizarea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea detaliicursa", details: err.message });
  }
};

exports.deleteDetaliiCursaSud = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaSud.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursaSud nu s-a gasit" });

    await detaliicursa.destroy();
    res.status(200).json({ message: "DetaliiCursaSud sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la stergerea detaliicursa", details: err.message });
  }
};
