const { DataTypes } = require("sequelize");
const { sequelizeWarehouse } = require("../../config/database");

const DimClient = sequelizeWarehouse.define("DimClient", 
  {
    cod_client: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    nume_client: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    nota_client: {
      type: DataTypes.DECIMAL(3, 1),
      validate: {
        min: 1,
        max: 10,
      },
    },
    apelativ: {
      type: DataTypes.STRING(5),
    },
    data_nastere: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    tableName: "DIM_CLIENT",
  }
);

DimClient.sync = async (force = false) => {
  await sequelizeWarehouse.query(`
    DECLARE
      table_count NUMBER;
      force_flag NUMBER := ${force ? 1 : 0};
    BEGIN
      -- Verifică dacă tabela există
      SELECT COUNT(*) INTO table_count FROM user_tables WHERE table_name = 'DIM_CLIENT';

      -- Dacă force este TRUE și tabela există, o ștergem
      IF force_flag = 1 AND table_count > 0 THEN
        EXECUTE IMMEDIATE 'DROP TABLE DIM_CLIENT CASCADE CONSTRAINTS PURGE';
      END IF;

      -- Dacă tabela nu există (sau a fost ștearsă), o creăm
      IF force_flag = 1 OR table_count = 0 THEN
        EXECUTE IMMEDIATE '
          CREATE TABLE DIM_CLIENT (
            cod_client NUMBER PRIMARY KEY,
            nume_client VARCHAR2(255) NOT NULL,
            nota_client NUMBER(3,1),
            apelativ VARCHAR2(5),
            data_nastere DATE NOT NULL,
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
          )
          PARTITION BY RANGE (nota_client) (
            PARTITION dim_client_slab VALUES LESS THAN (7),
            PARTITION dim_client_mediu VALUES LESS THAN (9),
            PARTITION dim_client_premium VALUES LESS THAN (10.1),
            PARTITION dim_client_default VALUES LESS THAN (MAXVALUE)
          )
        ';
      END IF;
    END;
  `);
};

module.exports = DimClient;