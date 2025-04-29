const { DataTypes } = require("sequelize");
const { sequelizeCENTRAL } = require("../../config/database");

const ClientIdentity = sequelizeCENTRAL.define("ClientIdentity", 
  {
    cod_client: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nume: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    prenume: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
  },
  {
      freezeTableName: true,
      tableName: "CLIENT_IDENTITY",
      timestamps: false,
  }
);

module.exports = ClientIdentity;