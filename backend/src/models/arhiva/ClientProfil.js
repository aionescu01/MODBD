const { DataTypes } = require("sequelize");
const { sequelizeARHIVA } = require("../../config/database");

const ClientProfil = sequelizeARHIVA.define("ClientProfil", 
  {
    cod_client: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    data_nastere: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    nota: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: false,
    },
  },
  {
      freezeTableName: true,
      tableName: "CLIENT_PROFIL",
      timestamps: false,
  }
);

module.exports = ClientProfil;