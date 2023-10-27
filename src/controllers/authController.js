const jwt = require('jsonwebtoken');
const config = require('../config/token');
const authModel = require('../models/authModel')

exports.login = async (req, res) => {
  let { email, password } = req.body;

  try {
    if(!email) throw new Error('email is required');
    if(!password) throw new Error('password is required')

    const user = await authModel.login(email, password);

    const accessToken = jwt.sign({ id: user.user_id }, config.secretKey, { expiresIn: config.expiresIn });
    const refreshToken = jwt.sign({ id: user.user_id}, config.refreshSecretKey, { expiresIn: config.refreshExpiresIn });
    
    res.json({ 
      message: 'Login Successfully', 
      user:{
        user_id:user.user_id,
        username:user.username,
        email:user.email
      }, 
      accessToken: accessToken,
      refreshToken: refreshToken
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const newUser = await authModel.register(username, email, password);
      
      res.json({ success: true, message: 'Registrasi berhasil', user: newUser });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };
