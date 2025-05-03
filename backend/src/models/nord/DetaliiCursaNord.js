const { DataTypes } = require("sequelize");
const { sequelizeNORD } = require("../../config/database");

const DetaliiCursaNord = sequelizeNORD.define("DetaliiCursaNord", 
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
      tableName: "DETALII_CURSA_NORD",
      timestamps: false,
  }
);

module.exports = DetaliiCursaNord;