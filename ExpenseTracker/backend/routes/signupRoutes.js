const express = require('express');
const router = express.Router();

// Match this import path with either '../controller/...' or '../controllers/...'
const signupControl = require('../controller/signupControl');

router.post('/', signupControl.signupUser);
router.get('/:id', signupControl.getUser);

module.exports = router;