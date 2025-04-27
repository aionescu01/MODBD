const { DataTypes } = require("sequelize");
const { sequelizeOLTP } = require("../../config/database");

const Client = sequelizeOLTP.define("Client", 
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
    nr_telefon: {
      type: DataTypes.STRING(12),
      allowNull: false,
    },
    apelativ: {
      type: DataTypes.STRING(5),
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
      tableName: "CLIENT",
  }
);

module.exports = Client;