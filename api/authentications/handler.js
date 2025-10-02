class AuthenticationsHandler {
    constructor(AuthenticationsService, UsersService, TokenManager, validator) {
        this._authenticationsService = AuthenticationsService;
        this._usersService = UsersService;
        this._tokenManager = TokenManager;
        this._validator = validator;

        this.addAuthenticationsHandler = this.addAuthenticationsHandler.bind(this);
        this.putAuthenticationsHandler = this.putAuthenticationsHandler.bind(this);
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

    async putAuthenticationsHandler(request, h) {
        await this._validator.validatePutAuthenticationPayload(request.payload);

        const { refreshToken } = request.payload;

        await this._authenticationsService.verifyToken(refreshToken);

        const { id } = this._tokenManager.updateAccessToken(refreshToken);
        const accessToken = this._tokenManager.generateAccessToken({ id });

        const response = h.response({
            status: 'success',
            data: {
                accessToken
            }
        });
        response.code(201);
        return response;
    };
};

module.exports = AuthenticationsHandler;