const Client = require("../../models/oltp/Client");

exports.createClient = async (req, res) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    console.error("Eroare la crearea client:", err.message);
    res.status(500).json({ error: "Eroare la crearea client", details: err.message });
  }
};

exports.getAllClienti = async (req, res) => {
  try {
    const clienti = await Client.findAll();
    res.status(200).json(clienti);
  } catch (err) {
    console.error("Eroare la preluarea clienti:", err.message);
    res.status(500).json({ error: "Eroare la preluarea clienti", details: err.message });
  }
};

exports.getClientById = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: "Client nu s-a gasit" });
    res.status(200).json(client);
  } catch (err) {
    console.error("Eroare la preluarea client:", err.message);
    res.status(500).json({ error: "Eroare la preluarea client", details: err.message });
  }
};

exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: "Client nu s-a gasit" });

    const updatedClient = await client.update(req.body);
    res.status(200).json(updatedClient);
  } catch (err) {
    console.error("Eroare la actualizarea client:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea client", details: err.message });
  }
};

exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ error: "Client nu s-a gasit" });

    await client.destroy();
    res.status(200).json({ message: "Client sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea client:", err.message);
    res.status(500).json({ error: "Eroare la stergerea client", details: err.message });
  }
};
