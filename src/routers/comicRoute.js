var express = require('express');
var comic = require("../controller/comicController");
const router = express.Router();
const verifyToken = require('../auth/verifyToken')

router.route('/comic')
  .get(comic.findAll)
  .post(verifyToken, comic.save);

router.route('/comic/:id')
  .get(comic.findById)
  .patch(verifyToken, comic.update)
  .delete(verifyToken, comic.delete);

router.route('/comic/random')
  .get(comic.randomHQ);

route.router('/comic/score/:id')
  .post(comic.score);

module.exports = router;