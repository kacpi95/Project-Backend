const fs = require('fs');

module.exports = function removeFile(file) {
  if (file && file.path) {
    try {
      fs.unlinkSync(file.path);
    } catch (err) {
      console.error('Remove file');
    }
  }
};
