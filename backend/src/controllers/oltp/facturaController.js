const Factura = require("../../models/oltp/Factura");

exports.createFactura = async (req, res) => {
  try {
    const factura = await Factura.create(req.body);
    res.status(201).json(factura);
  } catch (err) {
    console.error("Eroare la crearea factura:", err.message);
    res.status(500).json({ error: "Eroare la crearea factura", details: err.message });
  }
};

exports.getAllFacturi = async (req, res) => {
  try {
    const facturi = await Factura.findAll();
    res.status(200).json(facturi);
  } catch (err) {
    console.error("Eroare la preluarea facturi:", err.message);
    res.status(500).json({ error: "Eroare la preluarea facturi", details: err.message });
  }
};

exports.getFacturaById = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura) return res.status(404).json({ error: "Factura nu s-a gasit" });
    res.status(200).json(factura);
  } catch (err) {
    console.error("Eroare la preluarea factura:", err.message);
    res.status(500).json({ error: "Eroare la preluarea factura", details: err.message });
  }
};

exports.updateFactura = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura) return res.status(404).json({ error: "Factura nu s-a gasit" });

    const updatedFactura = await factura.update(req.body);
    res.status(200).json(updatedFactura);
  } catch (err) {
    console.error("Eroare la actualizarea factura:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea factura", details: err.message });
  }
};

exports.deleteFactura = async (req, res) => {
  try {
    const factura = await Factura.findByPk(req.params.id);
    if (!factura) return res.status(404).json({ error: "Factura nu s-a gasit" });

    await factura.destroy();
    res.status(200).json({ message: "Factura sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea factura:", err.message);
    res.status(500).json({ error: "Eroare la stergerea factura", details: err.message });
  }
};
