const { DataTypes } = require("sequelize");
const { sequelizeCENTRAL } = require("../../config/database");

const LocatiiCentral = sequelizeCENTRAL.define("LocatiiCentral", 
    {
        cod_locatie: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        localitate: {
            type: DataTypes.STRING(30),
            allowNull: false,
        },
        judet: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: "LOCATII_CENTRAL",
        timestamps: false,
    }
);

module.exports = LocatiiCentral;