require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use(cors());

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