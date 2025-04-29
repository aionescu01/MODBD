const { DataTypes } = require("sequelize");
const { sequelizeCENTRAL } = require("../../config/database");

const AngajatIdentity = sequelizeCENTRAL.define("AngajatIdentity", 
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
    },
    {
        freezeTableName: true,
        tableName: "ANGAJAT_IDENTITY",
        timestamps: false,
    }
);

module.exports = AngajatIdentity;