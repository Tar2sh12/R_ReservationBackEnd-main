const express = require('express');
const router = express.Router();
const upload = require('../controller/uploadController');

  // Endpoint to handle image upload
module .exports = router.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    // Access uploaded file details through req.file
    const filePath = req.file.path; // Path to the uploaded file
    // You can do further processing or save the file path to a database here
    const separator = 'public\\images\\';
    const parts = filePath.split(separator);
    let result ="";
    if (parts.length > 1) {
      result = parts[1];
    }
    const link = 'http://localhost:3000/api/image/'+result;
    res.send({link});
  });
