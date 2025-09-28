const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  expires: { type: DataTransfer, require: true },
  session: { type: String, require: true },
});

module.exports = mongoose.model('Session', sessionSchema);
