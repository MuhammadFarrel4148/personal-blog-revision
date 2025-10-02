const InvariantError = require('../../exceptions/invariantError');
const addArticlesSchema = require('./schema');

const ArticleValidator = {
    validateAddArticlePayload: (payload) => {
        const validationResult = addArticlesSchema.validate(payload);

        if(validationResult.error) {
            throw new InvariantError(validationResult.error);
        };
    }
};

module.exports = ArticleValidator;