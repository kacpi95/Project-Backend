const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');

router.get('/', AdsController.getAll);
router.get('/:id', AdsController.getAdsId);
router.post('/', imageUpload.single('image'), AdsController.postAds);
router.delete('/:id', AdsController.deleteAds);
router.put('/:id', imageUpload.single('image'), AdsController.putAds);
router.get('/search/:searchPhrase', AdsController.getSearchAds);

module.exports = router;
