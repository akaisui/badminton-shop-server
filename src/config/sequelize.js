const { Sequelize } = require('sequelize');
const config = require('./database');

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const sequelize = new Sequelize(dbConfig.url, {
  dialect: dbConfig.dialect,
  logging: dbConfig.logging,
  define: dbConfig.define,
  dialectOptions: dbConfig.dialectOptions,
  pool: dbConfig.pool,
});

module.exports = sequelize;
