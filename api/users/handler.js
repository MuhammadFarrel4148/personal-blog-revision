class UsersHandler {
    constructor(usersService, validator) {
        this._usersService = usersService;
        this._validator = validator;

        this.addUsersHandler = this.addUsersHandler.bind(this);
    };

    async addUsersHandler(request, h) {
        await this._validator.validateUsersPayload(request.payload);
        const { username, password, fullname } = request.payload;

        const userId = await this._usersService.addUsersService(username, password, fullname);

        const response = h.response({
            status: 'success',
            data: {
                userId
            }
        });
        response.code(201);
        return response;
    };
};

module.exports = UsersHandler;