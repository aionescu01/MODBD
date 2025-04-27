const DetaliiCursa = require("../../models/oltp/DetaliiCursa");

exports.createDetaliiCursa = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursa.create(req.body);
    res.status(201).json(detaliicursa);
  } catch (err) {
    console.error("Eroare la crearea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la crearea detaliicursa", details: err.message });
  }
};

exports.getAllDetaliiCurse = async (req, res) => {
  try {
    const detaliicurse = await DetaliiCursa.findAll();
    res.status(200).json(detaliicurse);
  } catch (err) {
    console.error("Eroare la preluarea detaliicurse:", err.message);
    res.status(500).json({ error: "Eroare la preluarea detaliicurse", details: err.message });
  }
};

exports.getDetaliiCursaById = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursa.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursa nu s-a gasit" });
    res.status(200).json(detaliicursa);
  } catch (err) {
    console.error("Eroare la preluarea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la preluarea detaliicursa", details: err.message });
  }
};

exports.updateDetaliiCursa = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursa.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursa nu s-a gasit" });

    const updatedDetaliiCursa = await detaliicursa.update(req.body);
    res.status(200).json(updatedDetaliiCursa);
  } catch (err) {
    console.error("Eroare la actualizarea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea detaliicursa", details: err.message });
  }
};

exports.deleteDetaliiCursa = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursa.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursa nu s-a gasit" });

    await detaliicursa.destroy();
    res.status(200).json({ message: "DetaliiCursa sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la stergerea detaliicursa", details: err.message });
  }
};
