const express = require('express');
const { facebookLogin, getFacebookPages, getPageInsights } = require('../controllers/facebookController');
const router = express.Router();

router.get('/facebook/callback', facebookLogin);
router.post('/facebook/pages', getFacebookPages);
router.post('/facebook/insights', getPageInsights);

module.exports = router;
