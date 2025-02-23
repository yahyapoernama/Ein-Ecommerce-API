const { verifyToken } = require('../utils/jwtUtils');

// Middleware untuk memverifikasi token
const authenticateToken = (req, res, next) => {
  let token;

  // 1️⃣ Cek Bearer Token dari Header (Untuk Flutter)
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }
  // 2️⃣ Jika Tidak Ada, Coba Ambil dari Cookies (Untuk React)
  else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    console.log("Verifying token...");
    const decoded = verifyToken(token);
    req.user = decoded; // Simpan data user di request object
    console.log("Token verified:", decoded);
    next();
  } catch (err) {
    console.error('Error verifying token:', err);
    res.status(400).json({ message: 'Invalid token', error: err.message });
  }
};

module.exports = {
  authenticateToken,
};