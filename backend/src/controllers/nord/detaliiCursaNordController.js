const DetaliiCursaNord = require("../../models/nord/DetaliiCursaNord");

exports.createDetaliiCursaNord = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaNord.create(req.body);
    res.status(201).json(detaliicursa);
  } catch (err) {
    console.error("Eroare la crearea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la crearea detaliicursa", details: err.message });
  }
};

exports.getAllDetaliiCurseNord = async (req, res) => {
  try {
    const detaliicurse = await DetaliiCursaNord.findAll();
    res.status(200).json(detaliicurse);
  } catch (err) {
    console.error("Eroare la preluarea detaliicurse:", err.message);
    res.status(500).json({ error: "Eroare la preluarea detaliicurse", details: err.message });
  }
};

exports.getDetaliiCursaNordById = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaNord.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursaNord nu s-a gasit" });
    res.status(200).json(detaliicursa);
  } catch (err) {
    console.error("Eroare la preluarea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la preluarea detaliicursa", details: err.message });
  }
};

exports.updateDetaliiCursaNord = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaNord.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursaNord nu s-a gasit" });

    const updatedDetaliiCursaNord = await detaliicursa.update(req.body);
    res.status(200).json(updatedDetaliiCursaNord);
  } catch (err) {
    console.error("Eroare la actualizarea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea detaliicursa", details: err.message });
  }
};

exports.deleteDetaliiCursaNord = async (req, res) => {
  try {
    const detaliicursa = await DetaliiCursaNord.findByPk(req.params.id);
    if (!detaliicursa) return res.status(404).json({ error: "DetaliiCursaNord nu s-a gasit" });

    await detaliicursa.destroy();
    res.status(200).json({ message: "DetaliiCursaNord sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea detaliicursa:", err.message);
    res.status(500).json({ error: "Eroare la stergerea detaliicursa", details: err.message });
  }
};
