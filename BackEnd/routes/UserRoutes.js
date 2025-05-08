const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.post('/cadastro', UserController.register);
router.post('/login', UserController.login);
router.get('/home', UserController.getHome);

module.exports = router;
