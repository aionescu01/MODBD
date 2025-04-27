const { DataTypes } = require("sequelize");
const { sequelizeOLTP } = require("../../config/database");

const Discount = sequelizeOLTP.define("Discount", 
  {
    nota_discount: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    cod_discount: {
      type: DataTypes.INTEGER,
    },
  },
  {
      freezeTableName: true,
      tableName: "DISCOUNT",
  }
);

module.exports = Discount;