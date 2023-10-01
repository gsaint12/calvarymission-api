"use strict";

// routes/auth.js
var express = require('express');

var router = express.Router();

var jwt = require('jsonwebtoken');

require('dotenv').config();

var db = require('../../models');

var bcrypt = require('bcrypt');

var secretKey = process.env.SECRET_KEY;
router.post('/login', function _callee(req, res) {
  var _req$body, email, password, _user, token;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _req$body = req.body, email = _req$body.email, password = _req$body.password;
          _context.next = 4;
          return regeneratorRuntime.awrap(db.User.findOne({
            where: {
              email: email
            }
          }));

        case 4:
          _user = _context.sent;
          _context.t0 = _user;

          if (!_context.t0) {
            _context.next = 10;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(bcrypt.compare(password, _user.password));

        case 9:
          _context.t0 = _context.sent;

        case 10:
          if (!_context.t0) {
            _context.next = 13;
            break;
          }

          token = jwt.sign({
            userId: _user.id
          }, secretKey, {
            expiresIn: '1h'
          }); // Replace with your actual secret key

          res.status(200).json({
            token: token
          });

        case 13:
          return _context.abrupt("return", res.status(401).json({
            message: 'Invalid credentials'
          }));

        case 16:
          _context.prev = 16;
          _context.t1 = _context["catch"](0);
          console.error(_context.t1);
          res.status(500).json({
            message: 'Internal server error'
          });

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 16]]);
}); // POST route for user registration

router.post('/register', function _callee2(req, res) {
  var _req$body2, firstName, lastName, email, phone, password, existingUser, encryptedPassword, newUser, token;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          // Retrieve user registration data from the request body
          _req$body2 = req.body, firstName = _req$body2.firstName, lastName = _req$body2.lastName, email = _req$body2.email, phone = _req$body2.phone, password = _req$body2.password; // Check if the email already exists in the database

          _context2.next = 4;
          return regeneratorRuntime.awrap(db.User.findOne({
            where: {
              email: email
            }
          }));

        case 4:
          existingUser = _context2.sent;

          if (!existingUser) {
            _context2.next = 7;
            break;
          }

          return _context2.abrupt("return", res.status(409).json({
            message: 'Email already exists'
          }));

        case 7:
          _context2.next = 9;
          return regeneratorRuntime.awrap(bcrypt.hash(password, 10));

        case 9:
          encryptedPassword = _context2.sent;
          _context2.next = 12;
          return regeneratorRuntime.awrap(db.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email.toLowerCase(),
            // sanitize: convert email to lowercase
            phone: phone,
            password: encryptedPassword
          }));

        case 12:
          newUser = _context2.sent;
          // Create token
          token = jwt.sign({
            user_id: user._id,
            email: email
          }, secretKey, {
            expiresIn: "1h"
          }); // save user token

          user.token = token;
          return _context2.abrupt("return", res.status(201).json({
            message: 'User created successfully',
            user: newUser
          }));

        case 18:
          _context2.prev = 18;
          _context2.t0 = _context2["catch"](0);
          console.error('Error creating user:', _context2.t0);
          return _context2.abrupt("return", res.status(500).json({
            message: 'Internal server error'
          }));

        case 22:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 18]]);
});
module.exports = router;