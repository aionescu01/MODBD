const ClientContactNord = require("../../models/nord/ClientContactNord");

exports.createClientContact = async (req, res) => {
  try {
    const clientcontact = await ClientContactNord.create(req.body);
    res.status(201).json(clientcontact);
  } catch (err) {
    console.error("Eroare la crearea clientcontact:", err.message);
    res.status(500).json({ error: "Eroare la crearea clientcontact", details: err.message });
  }
};

exports.getAllClientContact = async (req, res) => {
  try {
    const clientcontact = await ClientContactNord.findAll();
    res.status(200).json(clientcontact);
  } catch (err) {
    console.error("Eroare la preluarea clientcontact:", err.message);
    res.status(500).json({ error: "Eroare la preluarea clientcontact", details: err.message });
  }
};

exports.getClientContactById = async (req, res) => {
  try {
    const clientcontact = await ClientContactNord.findByPk(req.params.id);
    if (!clientcontact) return res.status(404).json({ error: "ClientContact nu s-a gasit" });
    res.status(200).json(clientcontact);
  } catch (err) {
    console.error("Eroare la preluarea clientcontact:", err.message);
    res.status(500).json({ error: "Eroare la preluarea clientcontact", details: err.message });
  }
};

exports.updateClientContact = async (req, res) => {
  try {
    const clientcontact = await ClientContactNord.findByPk(req.params.id);
    if (!clientcontact) return res.status(404).json({ error: "ClientContact nu s-a gasit" });

    const updatedClientContact = await clientcontact.update(req.body);
    res.status(200).json(updatedClientContact);
  } catch (err) {
    console.error("Eroare la actualizarea clientcontact:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea clientcontact", details: err.message });
  }
};

exports.deleteClientContact = async (req, res) => {
  try {
    const clientcontact = await ClientContactNord.findByPk(req.params.id);
    if (!clientcontact) return res.status(404).json({ error: "ClientContact nu s-a gasit" });

    await clientcontact.destroy();
    res.status(200).json({ message: "ClientContact sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea clientcontact:", err.message);
    res.status(500).json({ error: "Eroare la stergerea clientcontact", details: err.message });
  }
};
