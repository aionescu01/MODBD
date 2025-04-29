const { DataTypes } = require("sequelize");
const { sequelizeCENTRAL } = require("../../config/database");

const DetaliiCursaCentral = sequelizeCENTRAL.define("DetaliiCursaCentral", 
  {
    cod_cursa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    data_cursa: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nota_sofer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nota_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
      freezeTableName: true,
      tableName: "DETALII_CURSA",
      timestamps: false,
  }
);

module.exports = DetaliiCursaCentral;