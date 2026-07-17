const User = require('../models/users');
const bcrypt = require('bcrypt');

const createNewUser = async (userData) => {
    const { name, email, phone, password } = userData;

    // 1. Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        const error = new Error('User already registered');
        error.statusCode = 409;
        throw error;
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create user record
    const result = await User.create({
        name,
        email,
        phone,
        password: hashedPassword
    });

    return result.toJSON();
};

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (!user) {
        const error = new Error('User Not Found');
        error.statusCode = 404;
        throw error;
    }
    return user.toJSON();
};

module.exports = {
    createNewUser,
    getUserById
};