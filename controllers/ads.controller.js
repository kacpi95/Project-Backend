const Ads = require('../models/ads.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ads.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdsId = async (req, res) => {
  try {
    const notice = await Ads.findById(req.params.id);
    if (!notice) res.status(404).json({ message: 'Not found' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
