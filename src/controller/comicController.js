var Comic = require('../model/comic');

exports.findAll = (req, res) => {
  Comic.find()
    .then((comics) => {
      res.json(comics);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.findById = (req, res) => {
  Comic.findById(req.params.id)
    .then((comic) => {
      if (comic) {
        res.json(comic);
      }
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.save = (req, res) => {
  const comic = new Comic(req);
  comic.title = req.body.title;
  comic.description = req.body.description;
  comic.author = req.body.author;
  comic.genre = req.body.genre;
  comic.cover = req.body.cover
  comic.save()
    .then(() => {
      res.json(comic);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.replace = (req, res) => {
  const options = { overwrite: true };
  Comic.update({ _id: req.params.id }, req.body, options).exec()
    .then((result) => {
      if (result.n) {
        return Comic.findById(req.params.id);
      }
      return res.send(404);
    })
    .then((comic) => {
      res.json(comic);
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.update = (req, res) => {
  const options = { new: true };
  Comic.findByIdAndUpdate(req.params.id, req.body, options)
    .then((comic) => {
      if (comic) {
        res.json(comic);
      } else {
        res.send(404);
      }
    })
    .catch((e) => {
      res.send(e);
    });
};

exports.delete = (req, res) => {
  Comic.remove({ _id: req.params.id })
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
    Comic.findOne({'title': req.params.title})
      .then(comic => {
        //Nota
        comic.rat .push(req.body.nota)
        //Media
        var soma = 0
        for(var i = 0; i < comic.nota.length; i++){
          soma += parseInt(comic.nota[i])
         }
        comic.media = soma/comic.nota.length
        comic.save();
        res.json(comic)
      })
      .catch((e) => {
        res.send(e);
      });
  };

/*
exports.media = (req, res) => {
  Comic.findOne({'title': req.params.title})
  .then(comic => {
    var media = 0
    var soma = 0
    for(var i = 0; i < comic.Nota.length; i++){
      soma += parseInt(comic.Nota[i])
    }
    media = soma/comic.Nota.length
    
    res.json(media)
  })
  .catch((e) => {
    res.send(e);
  });
}
*/