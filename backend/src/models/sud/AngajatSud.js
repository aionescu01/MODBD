const { DataTypes } = require("sequelize");
const { sequelizeSUD } = require("../../config/database");

const AngajatSud = sequelizeSUD.define("AngajatSud", 
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
        tableName: "ANGAJAT_SUD",
        timestamps: false,
    }
);

module.exports = AngajatSud;