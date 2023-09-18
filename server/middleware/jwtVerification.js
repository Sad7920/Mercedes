const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = process.env;

function authenticateJWT(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden, Please logout and login again!' });
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateJWT;
