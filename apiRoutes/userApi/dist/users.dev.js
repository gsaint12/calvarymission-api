"use strict";

var express = require('express');

var db = require('../../models'); // new require for db object


var router = express.Router();
router.get('/', function (req, res) {
  return db.User.findAll().then(function (users) {
    return res.json(users);
  })["catch"](function (err) {
    console.log('There was an error querying users', JSON.stringify(err));
    return res.send(err);
  });
});
router.get('/:id', function (req, res) {
  var userId = parseInt(req.params.id); // Get the ID from the URL parameters

  db.User.findByPk(userId).then(function (user) {
    if (!user) {
      return res.status(404).json({
        message: 'user not found'
      });
    }

    return res.json(user);
  })["catch"](function (err) {
    console.error('Error querying contact by ID', err);
    return res.status(500).json({
      message: 'Internal server error'
    });
  });
});
router.put('/', function (req, res) {
  return db.User.findById(userId).then(function (user) {
    var _req$body = req.body,
        firstName = _req$body.firstName,
        lastName = _req$body.lastName,
        email = _req$body.email,
        phone = _req$body.phone;
    return user.update({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone
    }).then(function () {
      return res.send(user);
    })["catch"](function (err) {
      console.log('***Error updating contact', JSON.stringify(err));
      res.status(400).send(err);
    });
  });
});
router["delete"]('/:id', function (req, res) {
  return db.User.findById(userId).then(function (user) {
    return user.destroy({
      force: true
    });
  }).then(function () {
    return res.send({
      id: id
    });
  })["catch"](function (err) {
    console.log('***Error deleting contact', JSON.stringify(err));
    res.status(400).send(err);
  });
});
router.put('/:id', function (req, res) {
  var id = parseInt(req.params.id);
  return db.User.findById(id).then(function (user) {
    var _req$body2 = req.body,
        firstName = _req$body2.firstName,
        lastName = _req$body2.lastName,
        email = _req$body2.email,
        phone = _req$body2.phone,
        password = _req$body2.password;
    return user.update({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      password: password
    }).then(function () {
      return res.send(user);
    })["catch"](function (err) {
      console.log('***Error updating contact', JSON.stringify(err));
      res.status(400).send(err);
    });
  });
});
module.exports = router;