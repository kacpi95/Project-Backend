const mongoose = require('mongoose');

const adsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  aboutSeller: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, require: true, ref: 'User' },
});

module.exports = mongoose.model('Ads', adsSchema);
