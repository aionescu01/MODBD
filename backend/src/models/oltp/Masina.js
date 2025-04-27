const { DataTypes } = require("sequelize");
const { sequelizeOLTP } = require("../../config/database");

const Masina = sequelizeOLTP.define("Masina", 
    {
        cod_masina: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        numar_masina: {
            type: DataTypes.STRING(10),
        },
        data_achizitionare: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data_revizie_urm: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        marca: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        model: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: "MASINA",
    }
);

module.exports = Masina;