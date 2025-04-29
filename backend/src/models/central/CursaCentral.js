const { DataTypes } = require("sequelize");
const { sequelizeCENTRAL } = require("../../config/database");

const CursaCentral = sequelizeCENTRAL.define("CursaCentral", 
    {
        cod_cursa: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        cod_masina: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cod_sofer: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cod_client: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        adresa_client: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
        destinatie: {
            type: DataTypes.STRING(35),
            allowNull: false,
        },
        cod_locatie: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: "CURSA_CENTRAL",
        timestamps: false,
    }
);
  
module.exports = CursaCentral;