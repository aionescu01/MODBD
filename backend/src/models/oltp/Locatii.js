const { DataTypes } = require("sequelize");
const { sequelizeOLTP } = require("../../config/database");

const Locatii = sequelizeOLTP.define("Locatii", 
    {
        cod_locatie: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        localitate: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        judet: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: "LOCATII",
    }
);

module.exports = Locatii;