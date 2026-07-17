const User = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authenticateUser = async (email, password) => {
    // 1. Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }

    // 2. Compare password hash
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
        const error = new Error("Invalid credentials");
        error.statusCode = 401;
        throw error;
    }

    // 3. Create signed JWT
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || 'secretkey'
    );

    // Return pure data
    return {
        token,
        userId: user.id
    };
};

module.exports = {
    authenticateUser
};