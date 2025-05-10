const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const { authMiddleware } = require('../controllers/UserController');


router.post('/cadastro', UserController.register);
router.post('/login', UserController.login);
router.get('/home', authMiddleware, UserController.getHome); 
router.get('/profile', authMiddleware, (req, res) => {
    res.status(200).json({
        mensagem: 'Bem-vindo ao seu perfil!',
        usuario: req.user  
    });
});

module.exports = router;
