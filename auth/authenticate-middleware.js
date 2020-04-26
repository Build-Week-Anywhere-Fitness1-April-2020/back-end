const jwt = require('jsonwebtoken');

const { jwtSecret } = require('../config/secrets')

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if(token) {
    jwt.verify(token, jwtSecret, (error, decodedToken) => {
      if(error) {
        res.status(401).json({ Error: 'shall not pass!' })
       } else {
        req.decodedToken = decodedToken;

        next();
      }
    })
  } else {
    res.status(401).json({ Error: 'Please provide credentials'})
  }
};