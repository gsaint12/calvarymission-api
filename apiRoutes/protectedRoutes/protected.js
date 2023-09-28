// routes/protected.js
const express = require('express');
const router = express.Router();
const authenticate = require('../../middleware/authentication');

// Apply authentication middleware to protect this route
router.get('/', authenticate, (req, res) => {
  res.json({ message: 'You are not allowed to view this resource.' });
});

module.exports = router;
