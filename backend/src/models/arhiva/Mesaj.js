const { DataTypes } = require("sequelize");
const { sequelizeARHIVA } = require("../../config/database");

const Mesaj = sequelizeARHIVA.define("Mesaj", 
  {
    MESSAGE_ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    MESSAGE: {
      type: DataTypes.STRING(255),
    },
    MESSAGE_TYPE: {
      type: DataTypes.STRING(1),
      allowNull: false,
      validate: {
        isIn: [['E', 'W', 'I']],
      },
    },
    CREATED_BY: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    CREATED_AT: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
      freezeTableName: true,
      tableName: "MESAJ",
      timestamps: false,
  }
);

module.exports = Mesaj;