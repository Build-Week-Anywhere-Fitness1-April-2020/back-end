const jwt = require('jsonwebtoken');

module.exports = (user) => {
    const payload = {
        sub: user.id,
    };
    const secret = process.env.JWT_SECRET || 'This is a secret';
    const options = {
        expiresIn: '1h'
    }
    return jwt.sign(payload, secret, options);
}