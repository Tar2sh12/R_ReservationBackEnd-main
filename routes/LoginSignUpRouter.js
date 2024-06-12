const express = require('express');
const router = express.Router();
const { loginUser,signupUser } = require('../controller/loginSignUpController');

// Login for both customer and vendor
router.post('/login', loginUser);
router.post('/signup', signupUser);

module.exports = router;
