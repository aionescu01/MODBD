const LucreazaIn = require("../../models/oltp/LucreazaIn");

exports.createLucreazaIn = async (req, res) => {
  try {
    const lucreazain = await LucreazaIn.create(req.body);
    res.status(201).json(lucreazain);
  } catch (err) {
    console.error("Eroare la crearea lucreazain:", err.message);
    res.status(500).json({ error: "Eroare la crearea lucreazain", details: err.message });
  }
};

exports.getAllLucreazaIn = async (req, res) => {
  try {
    const lucreazain = await LucreazaIn.findAll();
    res.status(200).json(lucreazain);
  } catch (err) {
    console.error("Eroare la preluarea lucreazain:", err.message);
    res.status(500).json({ error: "Eroare la preluarea lucreazain", details: err.message });
  }
};

exports.getLucreazaInById = async (req, res) => {
  try {
    const lucreazain = await LucreazaIn.findOne({
      where: {
        cod_angajat: req.params.cod_angajat,
        cod_locatie: req.params.cod_locatie,
      },
    });
    if (!lucreazain) return res.status(404).json({ error: "LucreazaIn nu s-a gasit" });
    res.status(200).json(lucreazain);
  } catch (err) {
    console.error("Eroare la preluarea lucreazain:", err.message);
    res.status(500).json({ error: "Eroare la preluarea lucreazain", details: err.message });
  }
};

exports.updateLucreazaIn = async (req, res) => {
  try {
    const lucreazain = await LucreazaIn.findOne({
      where: {
        cod_angajat: req.params.cod_angajat,
        cod_locatie: req.params.cod_locatie,
      },
    });
    if (!lucreazain) return res.status(404).json({ error: "LucreazaIn nu s-a gasit" });

    const updatedLucreazaIn = await lucreazain.update(req.body);
    res.status(200).json(updatedLucreazaIn);
  } catch (err) {
    console.error("Eroare la actualizarea lucreazain:", err.message);
    res.status(500).json({ error: "Eroare la actualizarea lucreazain", details: err.message });
  }
};

exports.deleteLucreazaIn = async (req, res) => {
  try {
    const lucreazain = await LucreazaIn.findOne({
      where: {
        cod_angajat: req.params.cod_angajat,
        cod_locatie: req.params.cod_locatie,
      },
    });
    if (!lucreazain) return res.status(404).json({ error: "LucreazaIn nu s-a gasit" });

    await lucreazain.destroy();
    res.status(200).json({ message: "LucreazaIn sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea lucreazain:", err.message);
    res.status(500).json({ error: "Eroare la stergerea lucreazain", details: err.message });
  }
};
