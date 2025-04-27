const { DataTypes } = require("sequelize");
const { sequelizeWarehouse } = require("../../config/database");

const DimLocatie = sequelizeWarehouse.define("DimLocatie", 
  {
    cod_locatie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    localitate: {
      type: DataTypes.STRING(100),
    },
    judet: {
      type: DataTypes.STRING(100),
    },
  },
  {
    freezeTableName: true,
    tableName: "DIM_LOCATIE",
  }
);

module.exports = DimLocatie;