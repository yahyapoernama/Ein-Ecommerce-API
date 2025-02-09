const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const { uploadFile, getFile } = require('../controllers/uploadController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, upload.single('file'), uploadFile);

// API untuk mengambil file berdasarkan nama
router.get('/:filename', authenticateToken, getFile);

module.exports = router;
