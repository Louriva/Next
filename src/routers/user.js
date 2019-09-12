var express = require('express');
var user = require("../controller/user");
const router = express.Router();

router.route('/user')
  .get(user.findAll)
  .post(user.save);

router.route('/user/:id')
  .get(user.findById)
  .put(user.replace)
  .patch(user.update)
  .delete(user.delete);

module.exports = router;