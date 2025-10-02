class ArticlesHandler {
    constructor(articlesService, validator) {
        this._articlesService = articlesService;
        this._validator = validator;

        this.addArticlesHandler = this.addArticlesHandler.bind(this);
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
};

module.exports = ArticlesHandler;