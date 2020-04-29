const jwt = require('jsonwebtoken');

module.exports = (user, role) => {
    const payload = {
        userId: user.id,
        role
    };
    const secret = process.env.JWT_SECRET || 'This is a secret';
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secret, options);
}