const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Connexion
router.post('/login', authController.login);


// Inscription
router.post('/register', authController.register);


module.exports = router;
