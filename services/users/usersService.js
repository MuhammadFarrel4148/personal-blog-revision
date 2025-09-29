const { Pool } = require('pg');
const InvariantError = require('../../exceptions/invariantError');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');

class UsersService {
    constructor() {
        this._pool = new Pool();
    };

    async verifyUsername(username) {
        const query = {
            text: `SELECT * FROM users WHERE username = $1`,
            values: [username]
        };

        const result = await this._pool.query(query);

        if(result.rows.length > 0) {
            throw new InvariantError('username sudah digunakan');
        };
    };

    async addUsersService(username, password, fullname) {
        await this.verifyUsername(username);

        const id = `user-${nanoid(16)}`;
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = {
            text: `INSERT INTO users(id, username, password, fullname) VALUES($1, $2, $3, $4) RETURNING id`,
            values: [id, username, hashedPassword, fullname]
        };

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new InvariantError('user gagal ditambahkan');
        };

        return result.rows[0].id;
    };
};

module.exports = UsersService;