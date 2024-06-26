const express = require('express');
const router = express.Router();
const { createGroup, joinGroup } = require('./controller');
const isAuthenticated = require('../middleware/isAuthenticated');

// Routes

router.post('/create', isAuthenticated, createGroup);
router.post('/join', isAuthenticated, joinGroup);

module.exports = router;
