var express = require('express');
var user = require("../controller/userController");
const verifyToken = require('../auth/verifyToken')
const router = express.Router();

router.route('/user')
  .post(user.save)
  .get(verifyToken,user.findAll);

  
router.route('/user/login')
  .post(user.login);

router.route('/user/logout')
  .post(verifyToken,user.logout);
  
router.route('/user/add-comic/:id')
  .post(verifyToken,user.addComic);

router.route('/user/:id')
  .get(verifyToken,user.findById)
  .patch(verifyToken,user.update)
  .delete(verifyToken,user.delete);

module.exports = router;