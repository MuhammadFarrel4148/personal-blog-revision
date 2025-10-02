const Joi = require('joi');

const authenticationsSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});

const putAuthenticationSchema = Joi.object({
    refreshToken: Joi.string().required()
});

module.exports = {
    authenticationsSchema,
    putAuthenticationSchema
}