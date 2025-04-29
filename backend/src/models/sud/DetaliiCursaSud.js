const { DataTypes } = require("sequelize");
const { sequelizeSUD } = require("../../config/database");

const DetaliiCursaSud = sequelizeSUD.define("DetaliiCursaSud", 
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

module.exports = DetaliiCursaSud;