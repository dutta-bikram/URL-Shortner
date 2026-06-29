const express = require('express');
const controller = require('../controllers/static');

const router = express.Router();

router.get('/', controller.handleHomePage);

module.exports = router;