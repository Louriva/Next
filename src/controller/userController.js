var User = require('../model/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var config = require('../auth/auth');

exports.findAll = (req, res) => {
  User.find().populate('Comic')
    .then((users) => {
      res.json(users);
    })
    .catch((e) => {
      res.send(e) || "Some error occurred while retrieving User.";
    });
};

exports.findById = (req, res) => {


  User.findById(req.params.id).populate('comicList')
    .then(user => {

      res.send(user);
    })
    .catch(err => {
      res.status(404).send({ message: "User not found" });
    });

};

exports.save = (req, res) => {
  var user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    comicList: []
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
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  },
    { new: true })
    .then((user) => {
      res.send(user);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(user => {
      res.send({ message: "User deleted successfully!" });
    }).catch(err => {
      res.status(404).send({ message: "Could not delete user" })
    });
};

exports.addComic = (req, res) => {
  User.findById(req.params.id)
    .then(user => {
      console.log(user)
      user.comicList.push(req.body.id)
      console.log(user)
      user.save();
      res.send(user)
    })
    .catch(err => {
      res.send(err)
    })
}

exports.login = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
      }
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      res.status(200).send({ auth: true, token: token });
    })
    .catch(err => {
      res.status(404).send({ message: "User not found" });
    })
}

exports.logout = (req,res) => {
  User.findOne({ email: req.body.email })
  .then(user => {
    res.status(200).send({ auth: false, token: null });
})
}