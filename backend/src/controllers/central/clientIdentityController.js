const ClientIdentity = require("../../models/central/ClientIdentity");

exports.createClientIdentity = async (req, res) => {
  try {
    const clientidentity = await ClientIdentity.create(req.body);
    res.status(201).json(clientidentity);
  } catch (err) {
    console.error("Eroare la crearea clientidentity:", err.message);
    res.status(500).json({ error: "Eroare la crearea clientidentity", details: err.message });
  }
};

exports.getAllClientIdentity = async (req, res) => {
  try {
    const clientidentity = await ClientIdentity.findAll();
    res.status(200).json(clientidentity);
  } catch (err) {
    console.error("Eroare la preluarea clientidentity:", err.message);
    res.status(500).json({ error: "Eroare la preluarea clientidentity", details: err.message });
  }
};

exports.getClientIdentityById = async (req, res) => {
  try {
    const clientidentity = await ClientIdentity.findByPk(req.params.id);
    if (!clientidentity) return res.status(404).json({ error: "ClientIdentity nu s-a gasit" });
    res.status(200).json(clientidentity);
  } catch (err) {
    console.error("Eroare la preluarea clientidentity:", err.message);
    res.status(500).json({ error: "Eroare la preluarea clientidentity", details: err.message });
  }
};

exports.updateClientIdentity = async (req, res) => {
  try {
    const clientidentity = await ClientIdentity.findByPk(req.params.id);
    if (!clientidentity) return res.status(404).json({ error: "ClientIdentity nu s-a gasit" });

    const updatedClientIdentity = await clientidentity.update(req.body);
    res.status(200).json(updatedClientIdentity);
  } catch (err) {
    console.error("Eroare la actualizarea clientidentity:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea clientidentity", details: err.message });
  }
};

exports.deleteClientIdentity = async (req, res) => {
  try {
    const clientidentity = await ClientIdentity.findByPk(req.params.id);
    if (!clientidentity) return res.status(404).json({ error: "ClientIdentity nu s-a gasit" });

    await clientidentity.destroy();
    res.status(200).json({ message: "ClientIdentity sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea clientidentity:", err.message);
    res.status(500).json({ error: "Eroare la stergerea clientidentity", details: err.message });
  }
};
