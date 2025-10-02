const InvariantError = require('../../exceptions/invariantError');
const { 
    authenticationsSchema,
    putAuthenticationSchema 
} = require('./schema');

const AuthenticationValidator = {
    validateAuthenticationPayload: (payload) => {
        const validationResult = authenticationsSchema.validate(payload);

        if(validationResult.error) {
            throw new InvariantError(validationResult.error);
        };
    },

    validatePutAuthenticationPayload: (payload) => {
        const validationResult = putAuthenticationSchema.validate(payload);

        if(validationResult.error) {
            throw new InvariantError(validationResult.error);
        };
    }
};

module.exports = AuthenticationValidator;