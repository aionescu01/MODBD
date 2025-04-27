const { DataTypes } = require("sequelize");
const { sequelizeWarehouse } = require("../../config/database");

const DimTimp = sequelizeWarehouse.define("DimTimp", 
  {
    cod_timp: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    anul: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    luna: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nume_luna: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    trimestru: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ziua: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ziua_saptamanii: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nume_zi: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    este_weekend: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "DIM_TIMP",
  }
);

module.exports = DimTimp;