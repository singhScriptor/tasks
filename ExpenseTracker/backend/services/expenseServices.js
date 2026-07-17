const Expense = require('../models/expense');

const createExpense = async (expenseData, userId) => {
    const result = await Expense.create({
        ...expenseData,
        userId: userId
    });
    return result.toJSON();
};

const getAllExpensesByUserId = async (userId) => {
    const expenses = await Expense.findAll({
        where: { userId: userId }
    });
    return expenses.map(e => e.toJSON());
};

const getExpenseByIdAndUserId = async (id, userId) => {
    return await Expense.findOne({
        where: { id, userId }
    });
};

const deleteExpenseByIdAndUserId = async (id, userId) => {
    const expense = await Expense.findOne({
        where: { id, userId }
    });

    if (!expense) {
        return null;
    }

    await expense.destroy();
    return true;
};

module.exports = {
    createExpense,
    getAllExpensesByUserId,
    getExpenseByIdAndUserId,
    deleteExpenseByIdAndUserId
};