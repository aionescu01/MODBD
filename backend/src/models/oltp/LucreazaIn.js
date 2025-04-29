const { DataTypes } = require("sequelize");
const { sequelizeOLTP } = require("../../config/database");

const LucreazaIn = sequelizeOLTP.define("LucreazaIn", 
  {
    cod_angajat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cod_locatie: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
      freezeTableName: true,
      tableName: "LUCREAZA_IN",
      timestamps: false,
  }
);

module.exports = LucreazaIn;