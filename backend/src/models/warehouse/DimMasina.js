const { DataTypes } = require("sequelize");
const { sequelizeWarehouse } = require("../../config/database");

const DimMasina = sequelizeWarehouse.define("DimMasina", 
  {
    cod_masina: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    marca: {
      type: DataTypes.STRING(100),
    },
    model: {
      type: DataTypes.STRING(100),
    },
    data_achizitionare: {
      type: DataTypes.DATE,
    },
    data_revizie_urm: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
    tableName: "DIM_MASINA",
  }
);

module.exports = DimMasina;