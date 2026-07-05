const express = require('express');
const controller = require('../controllers/static');

const router = express.Router();

router.get('/',  controller.handleHomePage);
router.get('/signup', controller.handleSignupPage);
router.get('/login', controller.handleLoginPage);

module.exports = router;