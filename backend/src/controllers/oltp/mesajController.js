const Mesaj = require("../../models/oltp/Mesaj");

exports.createMesaj = async (req, res) => {
  try {
    const mesaj = await Mesaj.create(req.body);
    res.status(201).json(mesaj);
  } catch (err) {
    console.error("Eroare la crearea mesaj:", err.message);
    res.status(500).json({ error: "Eroare la crearea mesaj", details: err.message });
  }
};

exports.getAllMesaje = async (req, res) => {
  try {
    const mesaje = await Mesaj.findAll();
    res.status(200).json(mesaje);
  } catch (err) {
    console.error("Eroare la preluarea mesaje:", err.message);
    res.status(500).json({ error: "Eroare la preluarea mesaje", details: err.message });
  }
};

exports.getMesajById = async (req, res) => {
  try {
    const mesaj = await Mesaj.findByPk(req.params.id);
    if (!mesaj) return res.status(404).json({ error: "Mesaj nu s-a gasit" });
    res.status(200).json(mesaj);
  } catch (err) {
    console.error("Eroare la preluarea mesaj:", err.message);
    res.status(500).json({ error: "Eroare la preluarea mesaj", details: err.message });
  }
};

exports.updateMesaj = async (req, res) => {
  try {
    const mesaj = await Mesaj.findByPk(req.params.id);
    if (!mesaj) return res.status(404).json({ error: "Mesaj nu s-a gasit" });

    const updatedMesaj = await mesaj.update(req.body);
    res.status(200).json(updatedMesaj);
  } catch (err) {
    console.error("Eroare la actualizarea mesaj:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea mesaj", details: err.message });
  }
};

exports.deleteMesaj = async (req, res) => {
  try {
    const mesaj = await Mesaj.findByPk(req.params.id);
    if (!mesaj) return res.status(404).json({ error: "Mesaj nu s-a gasit" });

    await mesaj.destroy();
    res.status(200).json({ message: "Mesaj sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea mesaj:", err.message);
    res.status(500).json({ error: "Eroare la stergerea mesaj", details: err.message });
  }
};
