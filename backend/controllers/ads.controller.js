const Ads = require('../models/ads.model');
const removeFile = require('../utils/removeFile');
const path = require('path');

exports.getAll = async (req, res) => {
  try {
    res.json(await Ads.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getAdsId = async (req, res) => {
  try {
    const notice = await Ads.findById(req.params.id).populate(
      'userId',
      'login numberPhone avatar',
    );
    if (!notice) return res.status(404).json({ message: 'Not found' });
    return res.json(notice);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.postAds = async (req, res) => {
  const { title, text, price, location, aboutSeller } = req.body;

  try {
    const newNotice = new Ads({
      title,
      text,
      image: req.file.filename,
      price,
      location,
      aboutSeller,
      userId: req.session.user.id,
    });
    if (!req.file)
      return res.status(400).json({ message: 'Image is required' });

    await newNotice.save();
    res.json(newNotice);
  } catch (err) {
    removeFile(req.file);
    res.status(500).json({ message: err });
  }
};

exports.deleteAds = async (req, res) => {
  try {
    const notice = await Ads.findById(req.params.id);

    if (!notice) return res.status(404).json({ message: 'Not Found' });

    if (notice.userId.toString() !== req.session.user.id) {
      return res.status(403).json({ message: 'You are not author ad' });
    }

    await Ads.findByIdAndDelete(req.params.id);
    if (notice.image) {
      removeFile({ path: path.join(__dirname, '..', 'uploads', notice.image) });
    }
    return res.json({ message: 'Ad deleted success' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putAds = async (req, res) => {
  try {
    const notice = await Ads.findById(req.params.id);

    if (!notice) return res.status(404).json({ message: 'Not Found' });

    if (notice.userId.toHexString() !== req.session.user.id) {
      return res.status(403).json({ message: 'You are not author ad' });
    }
    const oldImage = notice.image;

    if (req.file) {
      notice.image = req.file.filename;
    }

    Object.assign(notice, req.body);

    await notice.save();

    if (req.file && oldImage) {
      await removeFile({
        path: path.join(__dirname, '..', 'uploads', oldImage),
      });
    }
    res.json(notice);
  } catch (err) {
    if (req.file) {
      await removeFile(req.file);
    }
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
