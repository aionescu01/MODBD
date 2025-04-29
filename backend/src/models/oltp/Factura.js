const { DataTypes } = require("sequelize");
const { sequelizeOLTP } = require("../../config/database");

const Factura = sequelizeOLTP.define("Factura", 
  {
    cod_factura: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    cod_dispecer: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cod_cursa: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pret: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
  },
  {
      freezeTableName: true,
      tableName: "FACTURA",
      timestamps: false,
  }
);

module.exports = Factura;