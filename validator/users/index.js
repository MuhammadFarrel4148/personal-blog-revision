const InvariantError = require('../../exceptions/invariantError');
const usersSchema = require('./schema');

const UsersValidator = {
    validateUsersPayload: (payload) => {
        const validationResult = usersSchema.validate(payload);

        if(validationResult.error) {
            throw new InvariantError(validationResult.error);
        };
    }
};

module.exports = UsersValidator;