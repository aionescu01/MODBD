const { Sequelize } = require("sequelize");
require('dotenv').config();

const sequelizeOLTP = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SID_OLTP,
  quoteIdentifiers: false,
  //logging: false,
});

const sequelizeNORD = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SID_NORD,
  quoteIdentifiers: false,
  //logging: false,
});

const sequelizeSUD = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SID_SUD,
  quoteIdentifiers: false,
  //logging: false,
});

const sequelizeCENTRAL = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SID_CENTRAL,
  quoteIdentifiers: false,
  //logging: false,
});

const sequelizeARHIVA = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SID_ARHIVA,
  quoteIdentifiers: false,
  //logging: false,
});

module.exports = { sequelizeOLTP, sequelizeNORD, sequelizeSUD, sequelizeCENTRAL, sequelizeARHIVA };