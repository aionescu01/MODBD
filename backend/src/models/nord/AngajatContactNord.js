const { DataTypes } = require("sequelize");
const { sequelizeNORD } = require("../../config/database");

const AngajatContactNord = sequelizeNORD.define("AngajatContactNord", 
    {
        cod_angajat: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nr_telefon: {
            type: DataTypes.STRING(12),
            allowNull: false,
        },
        tip_angajat: {
            type: DataTypes.STRING(25),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        tableName: "ANGAJAT_CONTACT",
        timestamps: false,
    }
);

module.exports = AngajatContactNord;