const { DataTypes } = require("sequelize");
const { sequelizeNORD } = require("../../config/database");

const LocatiiNord = sequelizeNORD.define("LocatiiNord", 
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
        tableName: "LOCATII_NORD",
        timestamps: false,
    }
);

module.exports = LocatiiNord;