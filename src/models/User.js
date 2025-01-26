const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Username harus unik
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email harus unik
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;