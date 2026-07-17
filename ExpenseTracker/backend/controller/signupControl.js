const signupService = require('../services/signupServices');

const signupUser = async (req, res, next) => {
    try {
        const { name, email, phone, password } = req.body;

        // Basic payload validation
        if (!name || !email || !phone || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Delegate creation to service
        const result = await signupService.createNewUser({ name, email, phone, password });

        res.status(201).json(result);
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Delegate query to service
        const user = await signupService.getUserById(id);

        res.status(200).json(user);
    } catch (err) {
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

module.exports = {
    signupUser,
    getUser
};