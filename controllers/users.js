var User = require('../models/user');
var express = require('express');
var router = express.Router();


// GET /users
// Get a list of users
router.get('/', function(req, res) {
  User.find({}, function(err, users) {
    if (err) {
      return res.status(500).json({
        error: "Error listing users: " + err
      });
    }

    res.json(users);
  });
});

// POST /users
// Create a new user
router.post('/', function(req, res) {
  User.create(req.body, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error creating user: " + err
      });
    }

    res.location('/users/' + user._id);
    res.sendStatus(201);
  });
});

// GET /users/:id
// Get a user by ID
router.get('/:id', function(req, res) {
  User.findOne({
    _id: req.params.id
  }, function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error reading user: " + err
      });
    }

    if (!user) {
      return res.status(404).end();
    }

    res.json(user);
  });
});

// PUT /users/:id
// Update a user by ID
router.put('/:id', function(req, res) {
  User.findOneAndUpdate({
    _id: req.params.id
  }, req.body , function(err, user) {
    if (err) {
      return res.status(500).json({
        error: "Error updating user: " + err
      });
    }

    res.sendStatus(200);
  });
});

// DELETE /users/:id
// Delete a user by ID
router.delete('/:id', function(req, res) {
  User.remove({
    _id: req.params.id
  }, function(err) {
    if (err) {
      return res.status(500).json({
        error: "Error deleting user: " + err
      });
    }

    res.sendStatus(200);
  });
});

module.exports = router;
