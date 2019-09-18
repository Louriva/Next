var express = require('express');
var comic = require("../controller/comicController");
const router = express.Router();

router.route('/comic')
  .get(comic.findAll)
  .post(comic.save);

router.route('/comic/:id')
  .get(comic.findById)
  .patch(comic.update)
  .delete(comic.delete);

module.exports = router;