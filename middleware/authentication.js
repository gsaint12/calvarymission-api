// middleware/authenticate.js
const jwt = require('jsonwebtoken');
const { User } = require('../models');

require('dotenv').config();
const secretKey = process.env.SECRET_KEY;

async function authenticate(req, res, next) {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, secretKey); // Replace with your actual secret key
    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = authenticate;
