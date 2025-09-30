class AuthenticationsHandler {
    constructor(AuthenticationsService, UsersService, TokenManager, validator) {
        this._authenticationsService = AuthenticationsService;
        this._usersService = UsersService;
        this._tokenManager = TokenManager;
        this._validator = validator;
    };

    async addAuthenticationsHandler(request, h) {
        await this._validator.validateAuthenticationPayload(request.payload)

        const { username, password } = request.payload;

        const id = await this._usersService.verifyCredential(username, password);

        const accessToken = await this._tokenManager.generateAccessToken({ id });
        const refreshToken = await this._tokenManager.generateRefreshToken({ id });

        await this._authenticationsService.addTokenService(refreshToken);

        const response = h.response({
            status: 'success',
            data: {
                accessToken,
                refreshToken
            }
        });
        response.code(201);
        return response;
    };
};

module.exports = AuthenticationsHandler;