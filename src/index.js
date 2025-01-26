require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sync database
sequelize.sync({ force: true }) // Hati-hati: `force: true` akan menghapus tabel yang ada
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Failed to sync database:', err));

// Routes
app.use('/api/auth', authRoutes); // Endpoint auth (register, login)
app.use('/api', userRoutes); // Endpoint user (get all users, get user by username)

// Jalankan server
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';
app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}:${PORT}`);
});