const { DataTypes } = require("sequelize");
const { sequelizeARHIVA } = require("../../config/database");

const AngajatHR = sequelizeARHIVA.define("AngajatHR", 
    {
        cod_angajat: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
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
    },
    {
        freezeTableName: true,
        tableName: "ANGAJAT_HR",
        timestamps: false,
    }
);

module.exports = AngajatHR;