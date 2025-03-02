const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '30d'; // Default 1 jam jika tidak ada di .env

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET tidak ditemukan! Pastikan ada di file .env.");
}

const generateToken = ({ id, username, email, first_name, last_name }) => {
  const tokenPayload = { id, username, email, first_name, last_name };
  return jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

module.exports = { generateToken, verifyToken };