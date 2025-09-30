require('dotenv').config();

const Jwt = require('@hapi/jwt');

const TokenManager = {
    generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESSTOKEN),
    generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESHTOKEN)
};

module.exports = TokenManager;