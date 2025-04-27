const DimAngajat = require("./DimAngajat");
const DimClient = require("./DimClient");
const DimFactura = require("./DimFactura");
const DimLocatie = require("./DimLocatie");
const DimMasina = require("./DimMasina");
const DimTimp = require("./DimTimp");
const FCursa = require("./FCursa");

DimFactura.hasOne(FCursa, { foreignKey: "cod_factura" });
FCursa.belongsTo(DimFactura, { foreignKey: "cod_factura" });

DimAngajat.hasMany(FCursa, { foreignKey: "cod_angajat" });
FCursa.belongsTo(DimAngajat, { foreignKey: "cod_angajat" });

DimClient.hasMany(FCursa, { foreignKey: "cod_client" });
FCursa.belongsTo(DimClient, { foreignKey: "cod_client" });

DimMasina.hasMany(FCursa, { foreignKey: "cod_masina" });
FCursa.belongsTo(DimMasina, { foreignKey: "cod_masina" });

DimLocatie.hasMany(FCursa, { foreignKey: "cod_locatie" });
FCursa.belongsTo(DimLocatie, { foreignKey: "cod_locatie" });

DimTimp.hasMany(FCursa, { foreignKey: "cod_timp" });
FCursa.belongsTo(DimTimp, { foreignKey: "cod_timp" });

module.exports = {
  DimAngajat,
  DimClient,
  DimFactura,
  DimLocatie,
  DimMasina,
  DimTimp,
  FCursa,
};