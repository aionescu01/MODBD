const DetaliiCursaCentral = require("../../models/central/DetaliiCursaCentral");

exports.createDetaliiCursaCentral = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaCentral.create(req.body);
    res.status(201).json(detaliicursa);
  } catch (err) {
    console.error("Eroare la crearea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la crearea detaliicursa", details: err.message });
  }
};

exports.getAllDetaliiCurseCentral = async (req, res) => {
  try {
    const detaliicurse = await DetaliiCursaCentral.findAll();
    res.status(200).json(detaliicurse);
  } catch (err) {
    console.error("Eroare la preluarea detaliicurse:", err.message);
    res.status(500).json({ error: "Eroare la preluarea detaliicurse", details: err.message });
  }
};

exports.getDetaliiCursaCentralById = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaCentral.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursaCentral nu s-a gasit" });
    res.status(200).json(detaliicursa);
  } catch (err) {
    console.error("Eroare la preluarea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la preluarea detaliicursa", details: err.message });
  }
};

exports.updateDetaliiCursaCentral = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaCentral.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursaCentral nu s-a gasit" });

    const updatedDetaliiCursaCentral = await detaliicursa.update(req.body);
    res.status(200).json(updatedDetaliiCursaCentral);
  } catch (err) {
    console.error("Eroare la actualizarea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea detaliicursa", details: err.message });
  }
};

exports.deleteDetaliiCursaCentral = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaCentral.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursaCentral nu s-a gasit" });

    await detaliicursa.destroy();
    res.status(200).json({ message: "DetaliiCursaCentral sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la stergerea detaliicursa", details: err.message });
  }
};
