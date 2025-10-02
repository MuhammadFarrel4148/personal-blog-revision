const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/invariantError');

class ArticlesService {
    constructor() {
        this._pool = new Pool();
    };

    async addArticlesService(userId, date, content, title) {
        const id = `article-${nanoid(16)}`;

        const query = {
            text: `INSERT INTO articles VALUES($1, $2, $3, $4, $5) RETURNING id`,
            values: [id, date, content, title, userId]
        };

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new InvariantError('article tidak dapat dibuat');
        };

        return result.rows[0].id;
    };
};

module.exports = ArticlesService;