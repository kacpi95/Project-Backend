const express = require('express');
const router = express.Router();
const AdsController = require('../controllers/ads.controller');
const imageUpload = require('../utils/imageUpload');
const authMiddleware = require('../utils/authMiddleware');

router.get('/', AdsController.getAll);
router.get('/search/:searchPhrase', AdsController.getSearchAds);
router.get('/:id', AdsController.getAdsId);
router.post(
  '/',
  authMiddleware,
  imageUpload.single('image'),
  AdsController.postAds,
);
router.put(
  '/:id',
  authMiddleware,
  imageUpload.single('image'),
  AdsController.putAds,
);
router.delete('/:id', authMiddleware, AdsController.deleteAds);

module.exports = router;
