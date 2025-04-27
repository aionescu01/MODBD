const Discount = require("../../models/oltp/Discount");

exports.createDiscount = async (req, res) => {
  try {
    const discount = await Discount.create(req.body);
    res.status(201).json(discount);
  } catch (err) {
    console.error("Eroare la crearea discount:", err.message);
    res.status(500).json({ error: "Eroare la crearea discount", details: err.message });
  }
};

exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.findAll();
    res.status(200).json(discounts);
  } catch (err) {
    console.error("Eroare la preluarea discounts:", err.message);
    res.status(500).json({ error: "Eroare la preluarea discounts", details: err.message });
  }
};

exports.getDiscountById = async (req, res) => {
  try {
    const discount = await Discount.findByPk(req.params.id);
    if (!discount) return res.status(404).json({ error: "Discount nu s-a gasit" });
    res.status(200).json(discount);
  } catch (err) {
    console.error("Eroare la preluarea discount:", err.message);
    res.status(500).json({ error: "Eroare la preluarea discount", details: err.message });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByPk(req.params.id);
    if (!discount) return res.status(404).json({ error: "Discount nu s-a gasit" });

    const updatedDiscount = await discount.update(req.body);
    res.status(200).json(updatedDiscount);
  } catch (err) {
    console.error("Eroare la actualizarea discount:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea discount", details: err.message });
  }
};

exports.deleteDiscount = async (req, res) => {
  try {
    const discount = await Discount.findByPk(req.params.id);
    if (!discount) return res.status(404).json({ error: "Discount nu s-a gasit" });

    await discount.destroy();
    res.status(200).json({ message: "Discount sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea discount:", err.message);
    res.status(500).json({ error: "Eroare la stergerea discount", details: err.message });
  }
};
