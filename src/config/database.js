require('dotenv').config(); // Load environment variables
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME, // Nama database
  process.env.DB_USER, // Username database
  process.env.DB_PASSWORD, // Password database
  {
    host: process.env.DB_HOST, // Host database
    port: process.env.DB_PORT, // Port database
    dialect: 'postgres', // Jenis database (postgres, mysql, sqlite, dll.)
    logging: false, // Nonaktifkan logging jika tidak diperlukan
  }
);

module.exports = sequelize;