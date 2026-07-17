const express = require('express');
const router = express.Router();

const paymentControl = require('../controller/paymentControl');
const authenticate = require('../middleware/authenticate'); // Your authenticate middleware

router.post('/initiate', authenticate, paymentControl.initiatePayment);
router.get('/status/:orderId', paymentControl.verifyPayment);

module.exports = router;