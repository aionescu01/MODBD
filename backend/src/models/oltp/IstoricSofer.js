const { DataTypes } = require("sequelize");
const { sequelizeOLTP } = require("../../config/database");

const IstoricSofer = sequelizeOLTP.define("IstoricSofer", 
  {
    cod_sofer: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nota: {
      type: DataTypes.DECIMAL(4, 2),
      allowNull: false,
    },
    numar_curse: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
      freezeTableName: true,
      tableName: "ISTORIC_SOFER",
      timestamps: false,
  }
);

module.exports = IstoricSofer;