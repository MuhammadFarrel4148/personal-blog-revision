class ArticlesHandler {
    constructor(articlesService, validator) {
        this._articlesService = articlesService;
        this._validator = validator;

        this.addArticlesHandler = this.addArticlesHandler.bind(this);
        this.updateArticlesHandler = this.updateArticlesHandler.bind(this);
        this.deleteArticlesHandler = this.deleteArticlesHandler.bind(this);
    };

    async addArticlesHandler(request, h) {
        await this._validator.validateAddArticlePayload(request.payload);

        const { id: credentialId } = request.auth.credentials;
        const { date, content, title } = request.payload;

        const articleId = await this._articlesService.addArticlesService(credentialId, date, content, title);

        const response = h.response({
            status: 'success',
            data: {
                articleId
            }
        });
        response.code(201);
        return response;
    };

    async updateArticlesHandler(request, h) {
        await this._validator.validateAddArticlePayload(request.payload);

        const { id: credentialId } = request.auth.credentials;
        const { id } = request.params;
        const { date, content, title } = request.payload;

        await this._articlesService.verifyArticles(id, credentialId);

        await this._articlesService.updateArticlesService(id, date, content, title);

        const response = h.response({
            status: 'success',
            message: 'article berhasil diupdate'
        });
        response.code(201);
        return response;
    };

    async deleteArticlesHandler(request, h) {
        const { id: credentialId } = request.auth.credentials;
        const { id } = request.params;

        await this._articlesService.verifyArticles(id, credentialId);

        await this._articlesService.deleteArticlesService(id);

        const response = h.response({
            status: 'success',
            message: 'article berhasil dihapus'
        });
        response.code(201);
        return response;
    };
};

module.exports = ArticlesHandler;