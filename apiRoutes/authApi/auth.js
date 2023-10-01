// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('../../models');
const bcrypt = require('bcrypt');

const secretKey = process.env.SECRET_KEY;

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email, } });
    if(user && await bcrypt.compare(password, user.password)){
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' }); // Replace with your actual secret key
      res.status(200).json({ token });

    }
      return res.status(401).json({ message: 'Invalid credentials' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// POST route for user registration
router.post('/register', async (req, res) => {
    try {
      // Retrieve user registration data from the request body
      const { firstName, lastName, email, phone, password } = req.body;
  
      // Check if the email already exists in the database
      const existingUser = await db.User.findOne({
        where: {
          email
        }
      });
      if (existingUser) {
        return res.status(409).json({ message: 'Email already exists' });
      }
  
      // Hash the user's password
     const encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user in the database
      const newUser = await db.User.create({
        firstName,
        lastName,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        phone,
        password: encryptedPassword,
      }); 
       // Create token
    const token = jwt.sign(
      { user_id: user._id, email }, secretKey,
      {
        expiresIn: "1h",
      }
    );
    // save user token
    user.token = token;

  
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ message: 'Internal server error' });  
    }
  });

module.exports = router; 