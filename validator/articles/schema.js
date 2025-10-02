const Joi = require('joi');

const addArticlesSchema = Joi.object({
    date: Joi.date().iso().required(),
    content: Joi.string().required(),
    title: Joi.string().required()
});

module.exports = addArticlesSchema;