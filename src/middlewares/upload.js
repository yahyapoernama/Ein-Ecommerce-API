const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

let upload;

if (process.env.NODE_ENV === 'production') {
    // Konfigurasi Cloudinary
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    // Storage Cloudinary
    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: 'uploads', // Nama folder di Cloudinary
            format: async (req, file) => 'png', // Format default (bisa diubah ke jpeg, jpg, dll)
            public_id: (req, file) => Date.now() + '-' + file.originalname,
        },
    });

    upload = multer({ storage });

} else {
    // Storage Lokal dengan Multer
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads/'); // Simpan di folder uploads
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname)); // Rename file dengan timestamp
        },
    });

    upload = multer({ storage });
}

module.exports = upload;
