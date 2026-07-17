const express = require('express');
const router = express.Router();

// Match this path with either '../controller/...' or '../controllers/...' depending on your setup
const signinControl = require('../controller/signinControl');

router.post('/signin', signinControl.signIn);

module.exports = router;