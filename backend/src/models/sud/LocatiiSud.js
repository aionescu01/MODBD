const { DataTypes } = require("sequelize");
const { sequelizeSUD } = require("../../config/database");

const LocatiiSud = sequelizeSUD.define("LocatiiSud", 
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
        tableName: "LOCATII_SUD",
        timestamps: false,
    }
);

module.exports = LocatiiSud;