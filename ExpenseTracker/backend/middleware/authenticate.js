const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization'); // or req.get('Authorization')
        if (!authHeader) {
            return res.status(401).json({ error: 'Token missing' });
        }

        // Strip "Bearer " prefix
        const token = authHeader.split(' ')[1];

        const decoded = jwt.verify(token, 'secretkey'); // use process.env.SECRET in real app
        req.user = decoded; // decoded should contain user.id
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};

module.exports = authenticate;
