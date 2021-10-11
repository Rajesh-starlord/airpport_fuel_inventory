var express = require('express');
var router = express.Router();
const UserController = require('../src/controllers/userController');
const userController = new UserController();

/*  users login. */
router.post('/login', userController.authenticateUser);

module.exports = router;
