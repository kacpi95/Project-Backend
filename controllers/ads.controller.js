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
    res.json(notice);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postAds = async (req, res) => {
  const { title, text, date, image, price, location, aboutSeller } = req.body;

  try {
    const newNotice = new Ads({
      title,
      text,
      date,
      image,
      price,
      location,
      aboutSeller,
    });
    await newNotice.save();
    res.json(newNotice);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteAds = async (req, res) => {
  try {
    const notice = await Ads.findByIdAndDelete(req.params.id);
    if (!notice) res.status(404).json({ message: 'Not Found' });
    else res.json(notice);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putAds = async (req, res) => {
  const { title, text, date, image, price, location, aboutSeller } = req.body;
  try {
    const notice = await Ads.findByIdAndUpdate(
      req.params.id,
      { title, text, date, image, price, location, aboutSeller },
      { new: true }
    );
    if (!notice) res.status(404).json({ message: 'Not Found' });
    else res.json(notice);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getSearchAds = async (req, res) => {
  const { searchPhrase } = req.params;
  try {
    const notice = await Ads.find({
      title: { $regex: searchPhrase, $options: 'i' },
    });
    res.json(notice);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};


