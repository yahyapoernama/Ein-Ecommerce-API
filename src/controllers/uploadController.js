const fs = require('fs');
const path = require('path');

const uploadFile = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const fileUrl = process.env.NODE_ENV === 'production' ? req.file.path : `/uploads/${req.file.filename}`;

    res.status(200).json({
        message: 'File uploaded successfully',
        file: fileUrl
    });
};

const getFile = (req, res) => {
    const filePath = path.resolve(__dirname, '../../uploads', req.params.filename);

    // Cek apakah file ada
    if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found' });
    }

    res.sendFile(filePath);
};

module.exports = { uploadFile, getFile };