const express = require('express');
const router = express.Router();
const { createGroup, joinGroup } = require('./controller');
const isAuthenticated = require('../middleware/isAuthenticated');

// Routes

router.post('/createGroup', isAuthenticated, createGroup);
router.post('/joinGroup', isAuthenticated, joinGroup);

module.exports = router;
