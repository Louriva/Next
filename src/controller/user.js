var bcrypt = require('bcrypt');
var User = require('../model/user');

exports.findAll = (req, res) => {
  User.find()
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.findById = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.json(user);
      }
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.save = (req, res) => {
  const { name } = req.body;
  const { email } = req.body;
  bcrypt.hash(req.body.password, 12)
    .then((password) => {
      User.create({ name, password, email })
        .then(() => {

          res.json({ message: 'User added' });
        });
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.replace = (req, res) => {
  const options = { overwrite: true };
  User.update({ _id: req.params.id }, req.body, options).exec()
    .then((result) => {
      if (result.n) {
        return User.findById(req.params.id);
      }
      return res.send(404);
    })
    .then((user) => {
      res.json(user);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.update = (req, res) => {
  const options = { new: true };
  User.findByIdAndUpdate(req.params.id, req.body, options)
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.send(404);
      }
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.delete = (req, res) => {
  User.remove({ _id: req.params.id })
    .exec()
    .then((result) => {
      if (result) {
        res.send(204);
      } else {
        res.send(404);
      }
    })
    .catch((e) => {
      res.send(e);
    });
};