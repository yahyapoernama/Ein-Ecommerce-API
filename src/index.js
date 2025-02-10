require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const sequelize = require('./config/database');
// const models = require("./models"); // Pastikan path benar
const routes = require('./routes');
const fs = require('fs');
const path = require('path');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// // Sync database
// sequelize.sync({ alter: true }) // Hati-hati: `force: true` akan menghapus tabel yang ada
//   .then(() => console.log('Database synced'))
//   .catch(err => console.error('Failed to sync database:', err));

// // Sync database
// models.sequelize.sync({ alter: true }).then(() => {
//   console.log("Database & tables synced!");
// }, (err) => {
//   console.log(err);
// });

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Routes
app.use('/api', routes); // Semua routes ada di dalam /api

// Middleware untuk akses file statis (hanya di development)
if (process.env.NODE_ENV === 'development') {
  app.use('/api/uploads', express.static('uploads'));
}

// Jalankan server
const PORT = process.env.PORT || 5000;
const BASE_URL = process.env.BASE_URL || 'http://localhost';
app.listen(PORT, () => {
  console.log(`Server running on ${BASE_URL}:${PORT}`);
});