var express = require('express');
var comic = require("../controller/comicController");
const router = express.Router();
const verifyToken = require('../auth/verifyToken')

router.route('/comic')
  .get(comic.findAll)
  .post(comic.save);

router.route('/comic/:id')
  .get(comic.findById)
  .patch(verifyToken,comic.update)
  .delete(verifyToken,comic.delete);

module.exports = router;