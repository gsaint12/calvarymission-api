const express = require('express');
const db = require('../../models'); // new require for db object

const router = express.Router();

router.get('/', (req, res) => {
    return db.User.findAll()
      .then((users) => res.json(users))
      .catch((err) => {
        console.log('There was an error querying contacts', JSON.stringify(err))
        return res.send(err)
      });
  });  

  router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id); // Get the ID from the URL parameters
  
    db.User.findByPk(userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'user not found' });
        }
        return res.json(user);
      })
      .catch((err) => {
        console.error('Error querying contact by ID', err);
        return res.status(500).json({ message: 'Internal server error' });
      });
  });

  router.put('/', (req, res) => {
    return db.User.findById(userId)
    .then((user) => {
      const { firstName, lastName, phone } = req.body
      return contact.update({ firstName, lastName, email })
        .then(() => res.send(contact))
        .catch((err) => {
          console.log('***Error updating contact', JSON.stringify(err))
          res.status(400).send(err)
        })
    })
  });

  router.delete('/:id', (req, res) => {
    return db.User.findById(userId)
      .then((user) => contact.destroy({ force: true }))
      .then(() => res.send({ id }))
      .catch((err) => {
        console.log('***Error deleting contact', JSON.stringify(err))
        res.status(400).send(err)
      })
  });
  
  router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id)
    return db.Contact.findById(id)
    .then((user) => {
      const { firstName, lastName, email, password } = req.body
      return contact.update({ firstName, lastName, email, password })
        .then(() => res.send(user))
        .catch((err) => {
          console.log('***Error updating contact', JSON.stringify(err))
          res.status(400).send(err)
        })
    })
  });

  module.exports = router;
