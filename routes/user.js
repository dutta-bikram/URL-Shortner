const express = require('express');
const controller = require('../controllers/user');

const router = express.Router();

router.post('/signup', controller.handleUserSignup);
router.post('/login', controller.handleUserLogin);
router.get('/logout', controller.handleLogout);

module.exports = router;