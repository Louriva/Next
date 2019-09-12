var bcrypt = require('bcrypt');
var User = require('../model/user');

exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      res.send(e) || "Some error occurred while retrieving User.";
    });
};

exports.findById = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(404).send({message: "User not found"});
    });
};

exports.save = (req, res) => {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  user.save()
    .then(user => {
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    });
}

exports.update = (req, res) => {
  User.findByIdAndUpdate(req.params.id,{
    name: req.body.name,
    email: req.body.email,
    password: req.body.password},
    {new: true})
    .then((user) => {  
      res.json(user);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.noteId)
  .then(user => {
      res.send({message: "User deleted successfully!"});
  }).catch(err => {
      res.status(404).send({message: "Could not delete user"})
      });
};