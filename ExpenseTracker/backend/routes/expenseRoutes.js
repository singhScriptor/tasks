const express = require('express');
const router = express.Router();

const expenseControl = require('../controller/expenseControl');
const authenticate = require('../middleware/authenticate');

router.post('/', authenticate, expenseControl.addExpense);
router.get('/', authenticate, expenseControl.getExpense);
router.delete('/:id', authenticate, expenseControl.deleteExpense);

module.exports = router;