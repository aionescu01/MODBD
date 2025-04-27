const { DataTypes } = require("sequelize");
const { sequelizeWarehouse } = require("../../config/database");

const DimFactura = sequelizeWarehouse.define("DimFactura", 
  {
    cod_factura: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cod_dispecer: {
      type: DataTypes.INTEGER,
    },
    cod_cursa: {
      type: DataTypes.INTEGER,
    },
    data_emitere: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pret: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    freezeTableName: true,
    tableName: "DIM_FACTURA",
  }
);

module.exports = DimFactura;