const express = require('express');
const router = express.Router();
const { signup, login, logout, home} = require('./controller');
const { isAuthenticated } = require('../middleware/isAuthenticated');

// Routes

router.post('/signup', signup);

router.post('/login', login);

router.post('/logout', logout);
module.exports = router;
