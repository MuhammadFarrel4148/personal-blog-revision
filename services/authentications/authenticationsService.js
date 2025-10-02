const { Pool } = require('pg');
const InvariantError = require('../../exceptions/invariantError');

class AuthenticationsService {
    constructor() {
        this._pool = new Pool();
    };

    async verifyToken(token) {
        const query = {
            text: `SELECT * FROM authentications WHERE token = $1`,
            values: [token]
        };

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new InvariantError('token tidak valid');
        };
    };

    async addTokenService(token) {
        const query = {
            text: `INSERT INTO authentications(token) VALUES($1)`,
            values: [token]
        };

        await this._pool.query(query);
    };

    async deleteTokenService(token) {
        const query = {
            text: `DELETE FROM authentications WHERE token = $1 RETURNING token`,
            values: [token]
        };

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new InvariantError('token tidak valid');
        };
    };
};

module.exports = AuthenticationsService;