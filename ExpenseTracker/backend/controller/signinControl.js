const signinService = require('../services/signinServices');

const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Basic request payload validation
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        // Delegate business logic to our service
        const authData = await signinService.authenticateUser(email, password);

        // Send successful JSON response
        res.status(200).json({
            message: "Successful login",
            token: authData.token,
            userId: authData.userId
        });
    } catch (err) {
        // Use custom status code from the service error if present; otherwise default to 500
        err.statusCode = err.statusCode || 500;
        next(err);
    }
};

module.exports = {
    signIn
};