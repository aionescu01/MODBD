const IstoricSofer = require("../../models/oltp/IstoricSofer");

exports.createIstoricSoferi = async (req, res) => {
  try {
    const istoricsofer = await IstoricSofer.create(req.body);
    res.status(201).json(istoricsofer);
  } catch (err) {
    console.error("Eroare la crearea istoricsofer:", err.message);
    res.status(500).json({ error: "Eroare la crearea istoricsofer", details: err.message });
  }
};

exports.getAllIstoricSoferi = async (req, res) => {
  try {
    const istoricsoferi = await IstoricSofer.findAll();
    res.status(200).json(istoricsoferi);
  } catch (err) {
    console.error("Eroare la preluarea istoricsoferi:", err.message);
    res.status(500).json({ error: "Eroare la preluarea istoricsoferi", details: err.message });
  }
};

exports.getIstoricSoferiById = async (req, res) => {
  try {
    const istoricsofer = await IstoricSofer.findByPk(req.params.id);
    if (!istoricsofer) return res.status(404).json({ error: "IstoricSofer nu s-a gasit" });
    res.status(200).json(istoricsofer);
  } catch (err) {
    console.error("Eroare la preluarea istoricsofer:", err.message);
    res.status(500).json({ error: "Eroare la preluarea istoricsofer", details: err.message });
  }
};

exports.updateIstoricSoferi = async (req, res) => {
  try {
    console.log("istoric sofer details: ", req.params);
    console.log("istoric sofer details: ", req.body);



    const istoricsofer = await IstoricSofer.findByPk(req.params.id);
    if (!istoricsofer) return res.status(404).json({ error: "IstoricSofer nu s-a gasit" });

    

    const updatedIstoricSofer = await istoricsofer.update(req.body);
    res.status(200).json(updatedIstoricSofer);
  } catch (err) {
    console.error("Eroare la actualizarea istoricsofer:", err.message);

    console.error("Eroare la actualizarea istoricsofer:", {
      mesajEroare: err.message,
      comandaSQL: err.sql || "N/A",
      valoriSQL: err.parameters || "N/A",
    });

    res.status(500).json({ error: "Eroare la actualizarea istoricsofer", details: err.message });
  }
};

exports.deleteIstoricSoferi = async (req, res) => {
  try {
    const istoricsofer = await IstoricSofer.findByPk(req.params.id);
    if (!istoricsofer) return res.status(404).json({ error: "IstoricSofer nu s-a gasit" });

    await istoricsofer.destroy();
    res.status(200).json({ message: "IstoricSofer sters cu succes" });
  } catch (err) {
    console.error("Eroare la stergerea istoricsofer:", err.message);
    res.status(500).json({ error: "Eroare la stergerea istoricsofer", details: err.message });
  }
};
