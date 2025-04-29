const { DataTypes } = require("sequelize");
const { sequelizeSUD } = require("../../config/database");

const ClientContactSud = sequelizeSUD.define("ClientContactSud", 
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

module.exports = ClientContactSud;