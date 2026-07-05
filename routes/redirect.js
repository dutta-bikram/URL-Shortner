const express = require('express');
const controller = require('../controllers/redirect');

const router = express.Router();

router.get('/:shortId', controller.handleRedirectingToOriginalURL);
module.exports = router;