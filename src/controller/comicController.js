var Comic = require('../model/comic');

exports.findAll = (req, res) => {
  Comic.find()
    .then((comics) => {
      res.json(comics);
    })
    .catch((e) => {
      res.send(e) || "Some error occurred while retrieving User.";
    });
};

exports.findById = (req, res) => {
  Comic.findById(req.params.id)
    .then((comic) => {
      if (comic) {
        res.send(comic);
      }
    })
    .catch((e) => {
      res.status(404).send({message: "Comic not found"});
    });
};

exports.save = (req, res) => {
  var comic = new Comic({
  title: req.body.title,
  description: req.body.description,
  author: req.body.author,
  genre: req.body.genre,
  image: req.body.image,
  comicLink: req.body.comicLink
  })

  comic.save()
  .then((comic) => {
    res.send(comic);
  })
  .catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Comic."
    });
  });
};

exports.update = (req, res) => {
  Comic.findByIdAndUpdate(req.params.id,{
  title: req.body.title,
  description: req.body.description,
  author: req.body.author,
  genre: req.body.genre,
  rating: [],
  avarage: null
  },{ new: true })
    .then((comic) => {
        res.send(comic);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.delete = (req, res) => {
  Comic.findByIdAndRemove(req.params.id)
  .then(comic =>{
    res.send({message:" Comic deleted successfully!"});
  })
  .catch(err => {
    res.status(404).send({message: "Could not delete comic"})
  })
};

exports.randomHQ = (req,res) =>{
    Comic.countDocuments().exec(function (err, count) {
      var random = Math.floor(Math.random() * count)
      Comic.findOne().skip(random).exec(
        function (err, result) {
          res.json(result) 
        })
    })
  }
  
exports.nota = (req, res) => {
    Comic.findById(req.params.id)
      .then(comic => {
        comic.rating.push(req.body.avarage)
        
        var soma = 0
        for(var i = 0; i < comic.avarage.length; i++){
          soma += parseInt(comic.avarage[i])
         }
        comic.rating = soma/comic.avarage.length
        comic.save();
        res.json(comic)
      })
      .catch((e) => {
        res.send(e);
      });
  };
