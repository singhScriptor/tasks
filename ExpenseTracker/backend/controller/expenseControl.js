const expenseService = require('../services/expenseServices');

const addExpense = async (req, res, next) => {
    try {
        const { price, description, category } = req.body;
        const userId = req.user.id;

        // Delegate DB operation to the service layer
        const result = await expenseService.createExpense({ price, description, category }, userId);

        res.status(201).json(result);
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};

const getExpense = async (req, res, next) => {
    try {
        const userId = req.user.id;

        // Fetch expenses through service
        const expenses = await expenseService.getAllExpensesByUserId(userId);

        res.json(expenses);
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};

const deleteExpense = async (req, res, next) => {
    try {
        const expenseId = req.params.id;
        const userId = req.user.id;

        // Perform delete via service
        const deleted = await expenseService.deleteExpenseByIdAndUserId(expenseId, userId);

        if (!deleted) {
            return res.status(404).json({ message: 'Expense not found or unauthorized' });
        }

        res.json({ message: 'Expense deleted successfully' });
    } catch (err) {
        err.statusCode = 500;
        next(err);
    }
};

module.exports = {
    addExpense,
    getExpense,
    deleteExpense
};