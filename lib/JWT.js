const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

exports.JWTGenerate = (req, data, duration = 1) => {
    data.ip = req.ip;
    return jwt.sign(data, JWT_KEY, { expiresIn: 60 * duration});
}

exports.JWTRead = (token, next) => {
    jwt.verify(token, JWT_KEY, next);
}
