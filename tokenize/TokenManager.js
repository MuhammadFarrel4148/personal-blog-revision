require('dotenv').config();

const Jwt = require('@hapi/jwt');
const InvariantError = require('../exceptions/invariantError');

const TokenManager = {
    generateAccessToken: (payload) => Jwt.token.generate(payload, process.env.ACCESSTOKEN),
    generateRefreshToken: (payload) => Jwt.token.generate(payload, process.env.REFRESHTOKEN),
    updateAccessToken: (refreshToken) => {
        try {
            const artifacts = Jwt.token.decode(refreshToken);

            Jwt.token.verifySignature(artifacts, process.env.REFRESHTOKEN);

            const { payload } = artifacts.decoded;

            return payload;
        } catch(error) {
            throw new InvariantError('token tidak valid');
        };
    }
};

module.exports = TokenManager;