var express = require('express');
var user = require("../controller/userController");
const router = express.Router();

router.route('/user')
  .post(user.save)
  .get(user.findAll);

  
router.route('/user/login')
  .post(user.login);

//router.route('/user/logout')
//  .post(user.logout);
  
router.route('/user/add-comic/:id')
  .post(user.addComic);

router.route('/user/:id')
  .get(user.findById)
  .patch(user.update)
  .delete(user.delete);

module.exports = router;