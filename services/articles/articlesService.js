const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/invariantError');
const NotFoundError = require('../../exceptions/notFoundError');
const AuthorizationError = require('../../exceptions/authorizationError');

class ArticlesService {
    constructor() {
        this._pool = new Pool();
    };

    async verifyArticles(articleId, userId) {
        const query = {
            text: `SELECT * FROM articles WHERE id = $1`,
            values: [articleId]
        };

        const result = await this._pool.query(query);

        if(!result.rows.length) {
            throw new NotFoundError('artikel tidak ditemukan');
        };

        if(result.rows[0].user !== userId) {
            throw new AuthorizationError('anda tidak berhak mengakses resource ini');
        };
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

    async updateArticlesService(articleId, date, content, title) {
        const query = {
            text: `UPDATE articles SET date = $1, content = $2, title = $3 WHERE id = $4`,
            values: [date, content, title, articleId]
        };

        await this._pool.query(query);
    };
};

module.exports = ArticlesService;