const jwt = require('jsonwebtoken');
const configToken = require('../config/token');
const authModel = require('../models/authModel')

exports.tokenVerification = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token tidak ada, otorisasi ditolak' });
  }

  try {
    const decoded = jwt.verify(token, configToken.secretKey);
    const user = await authModel.getUserById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: 'Akun tidak tidak ditemukan' });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
     if (error.name === 'TokenExpiredError') {
      try {
        const newAccessToken = gerateNewAccessToken(req.body.refreshToken);
        req.userId = newAccessToken.id;
        req.role = newAccessToken.role;
        next();
      } catch (refreshError) {
        return res.status(401).json({ success: false, message: 'Token kedaluwarsa' });
      } 
  } else {
    return res.status(401).json({ success: false, message: 'Token tidak valid' });
  }
  }
};

const gerateNewAccessToken = (refreshToken) => {
  try {
    const decodedRefreshToken = jwt.verify(refreshToken, config.refreshSecretKey);
    const newAccessToken = jwt.sign({ id: decodedRefreshToken.id, role: decodedRefreshToken.role }, config.secretKey, { expiresIn: config.expiresIn });

    return newAccessToken;
  } catch (error) {
    throw new Error('Invalid refresh token');
  }
};