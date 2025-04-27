const { DataTypes } = require("sequelize");
const { sequelizeWarehouse } = require("../../config/database");

const DimAngajat = sequelizeWarehouse.define("DimAngajat", 
  {
    cod_angajat: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nume_angajat: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    tip_angajat: {
      type: DataTypes.STRING(50),
    },
    data_angajare: {
      type: DataTypes.DATE,
    },
    salariu: {
      type: DataTypes.DECIMAL(10, 2),
    },
  },
  {
    freezeTableName: true,
    tableName: "DIM_ANGAJAT",
  }
);

module.exports = DimAngajat;