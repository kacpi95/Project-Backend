const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, './client/public/uploads');
  },
  filename: (req, file, cb) => {
    const [name, ext] = file.originalname.split('.');
    cb(null, `${name}-${Date.now()}.${ext}`);
  },
});

const imageUpload = multer({ storage });

module.exports = imageUpload;
