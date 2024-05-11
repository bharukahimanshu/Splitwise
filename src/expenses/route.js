const express = require('express');
const router = express.Router();
const { newexpense } = require('./controller');
const isAuthenticated = require('../middleware/isAuthenticated');

// Routes

router.post('/new', isAuthenticated, newexpense);

module.exports = router;
