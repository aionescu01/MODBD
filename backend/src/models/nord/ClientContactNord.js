const { DataTypes } = require("sequelize");
const { sequelizeNORD } = require("../../config/database");

const ClientContactNord = sequelizeNORD.define("ClientContactNord", 
  {
    cod_client: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nr_telefon: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    apelativ: {
      type: DataTypes.STRING(5),
    },
  },
  {
      freezeTableName: true,
      tableName: "CLIENT_CONTACT",
      timestamps: false,
  }
);

module.exports = ClientContactNord;