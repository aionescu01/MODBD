const { DataTypes } = require("sequelize");
const { sequelizeSUD } = require("../../config/database");

const AngajatContactSud = sequelizeSUD.define("AngajatContactSud", 
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
        dispecerat: {
            type: DataTypes.STRING(25),
        },
    },
    {
        freezeTableName: true,
        tableName: "ANGAJAT_CONTACT",
        timestamps: false,
    }
);

module.exports = AngajatContactSud;