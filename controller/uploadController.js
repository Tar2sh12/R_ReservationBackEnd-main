const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images'); // Set your destination folder for uploaded images
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Rename file if needed
    },
  });
  
  const upload = multer({ storage: storage });


  
  module.exports = upload;