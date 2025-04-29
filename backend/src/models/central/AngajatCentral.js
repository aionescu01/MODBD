const { DataTypes } = require("sequelize");
const { sequelizeCENTRAL } = require("../../config/database");

const AngajatCentral = sequelizeCENTRAL.define("AngajatCentral", 
    {
        cod_angajat: {
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
        tip_angajat: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
        data_nastere: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        data_angajare: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        salariu: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        cod_masina: {
            type: DataTypes.INTEGER,
        },
        dispecerat: {
            type: DataTypes.STRING(25),
        },
    },
    {
        freezeTableName: true,
        tableName: "ANGAJAT_CENTRAL",
        timestamps: false,
    }
);

module.exports = AngajatCentral;