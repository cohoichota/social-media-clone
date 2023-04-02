const express = require('express');

const router = express.Router();

const { postRegister, postLogin } = require('../controllers/auth');

// Register
router.post('/register', postRegister);

// LOGIN
router.post('/login', postLogin);

module.exports = router;
