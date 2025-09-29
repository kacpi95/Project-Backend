const Ads = require('../models/ads.model');
const removeFile = require('../utils/removeFile');

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
  const { title, text, date, price, location, aboutSeller } = req.body;

  try {
    const newNotice = new Ads({
      title,
      text,
      date,
      avatar: req.file.filename,
      price,
      location,
      aboutSeller,
    });
    await newNotice.save();
    res.json(newNotice);
  } catch (err) {
    removeFile(req.file);
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
  const { title, text, date, price, location, aboutSeller } = req.body;
  try {
    const notice = await Ads.findById(req.params.id);
    if (!notice) res.status(404).json({ message: 'Not Found' });

    const oldAvatar = notice.avatar;

    if (req.file) {
      notice.avatar = req.file.filename;
    }

    notice.title = title ?? notice.title;
    notice.text = text ?? notice.text;
    notice.date = date ?? notice.date;
    notice.price = price ?? notice.price;
    notice.location = location ?? notice.location;
    notice.aboutSeller = aboutSeller ?? notice.aboutSeller;

    await notice.save();

    if (req.file && oldAvatar) {
      await removeFile({ path: `./client/public/uploads/${oldAvatar}` });
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
