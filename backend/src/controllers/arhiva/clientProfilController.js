const ClientProfil = require("../../models/arhiva/ClientProfil");

exports.createClientProfil = async (req, res) => {
  try {
    const clientprofil = await ClientProfil.create(req.body);
    res.status(201).json(clientprofil);
  } catch (err) {
    console.error("Eroare la crearea clientprofil:", err.message);
    res.status(500).json({ error: "Eroare la crearea clientprofil", details: err.message });
  }
};

exports.getAllClientiProfil = async (req, res) => {
  try {
    const clientiprofil = await ClientProfil.findAll();
    res.status(200).json(clientiprofil);
  } catch (err) {
    console.error("Eroare la preluarea clientiprofil:", err.message);
    res.status(500).json({ error: "Eroare la preluarea clientiprofil", details: err.message });
  }
};

exports.getClientProfilById = async (req, res) => {
  try {
    const clientprofil = await ClientProfil.findByPk(req.params.id);
    if (!clientprofil) return res.status(404).json({ error: "ClientProfil nu s-a gasit" });
    res.status(200).json(clientprofil);
  } catch (err) {
    console.error("Eroare la preluarea clientprofil:", err.message);
    res.status(500).json({ error: "Eroare la preluarea clientprofil", details: err.message });
  }
};

exports.updateClientProfil = async (req, res) => {
  try {
    const clientprofil = await ClientProfil.findByPk(req.params.id);
    if (!clientprofil) return res.status(404).json({ error: "ClientProfil nu s-a gasit" });

    const updatedClientProfil = await clientprofil.update(req.body);
    res.status(200).json(updatedClientProfil);
  } catch (err) {
    console.error("Eroare la actualizarea clientprofil:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea clientprofil", details: err.message });
  }
};

exports.deleteClientProfil = async (req, res) => {
  try {
    const clientprofil = await ClientProfil.findByPk(req.params.id);
    if (!clientprofil) return res.status(404).json({ error: "ClientProfil nu s-a gasit" });

    await clientprofil.destroy();
    res.status(200).json({ message: "ClientProfil sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea clientprofil:", err.message);
    res.status(500).json({ error: "Eroare la stergerea clientprofil", details: err.message });
  }
};
