const { verifyToken } = require('../utils/jwtUtils');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = verifyToken(token);
    req.user = decoded; // Simpan data user di request object
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = authenticateToken;