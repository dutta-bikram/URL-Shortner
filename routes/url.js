const express = require('express');
const controller = require('../controllers/url');

const router = express.Router();


router.get('/', (req, res)=>{
    res.end('Hey wellcome to homepage');
})


router.post('/url', controller.handleGenerateNewShortURL);
router.get('/url/analytics/:shortId', controller.handleGetAnalytics);
router.get('/:shortId', controller.handleRedirectingToOriginalURL);

module.exports = router;