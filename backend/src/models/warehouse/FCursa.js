const { DataTypes } = require("sequelize");
const { sequelizeWarehouse } = require("../../config/database");

const FCursa = sequelizeWarehouse.define("FCursa", 
  {
    cod_cursa: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nota_sofer: {
      type: DataTypes.DECIMAL(3, 1),
      validate: {
        min: 1,
        max: 10,
      },
    },
    nota_client: {
      type: DataTypes.DECIMAL(3, 1),
      validate: {
        min: 1,
        max: 10,
      },
    },
    cod_factura: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cod_client: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cod_angajat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cod_masina: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cod_locatie: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cod_timp: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "F_CURSA",
  }
);

FCursa.sync = async (force = false) => {
  await sequelizeWarehouse.query(`
    DECLARE
      table_count NUMBER;
      force_flag NUMBER := ${force ? 1 : 0};
    BEGIN
      -- Verifică dacă tabela există
      SELECT COUNT(*) INTO table_count FROM user_tables WHERE table_name = 'F_CURSA';

      -- Dacă force este TRUE și tabela există, o ștergem
      IF force_flag = 1 AND table_count > 0 THEN
        EXECUTE IMMEDIATE 'DROP TABLE F_CURSA CASCADE CONSTRAINTS PURGE';
      END IF;

      -- Dacă tabela nu există (sau a fost ștearsă), o creăm
      IF force_flag = 1 OR table_count = 0 THEN
        EXECUTE IMMEDIATE '
          CREATE TABLE F_CURSA (
            cod_cursa NUMBER PRIMARY KEY,
            nota_sofer NUMBER(3,1),
            nota_client NUMBER(3,1),
            cod_factura NUMBER NOT NULL,
            cod_client NUMBER NOT NULL,
            cod_angajat NUMBER NOT NULL,
            cod_masina NUMBER NOT NULL,
            cod_locatie NUMBER NOT NULL,
            cod_timp NUMBER NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
          PARTITION BY RANGE (cod_timp) (
            PARTITION before VALUES LESS THAN (1462),
            PARTITION n1_45_2025 VALUES LESS THAN (1507),
            PARTITION n2_45_2025 VALUES LESS THAN (1552),
            PARTITION after VALUES LESS THAN (MAXVALUE)
          )
        ';
      END IF;
    END;
  `);
};

module.exports = FCursa;