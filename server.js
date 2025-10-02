require('dotenv').config();

const Jwt = require('@hapi/jwt');
const Hapi = require('@hapi/hapi');
const users = require('./api/users');
const authentications = require('./api/authentications');
const articles = require('./api/articles');
const UsersService = require('./services/users/usersService');
const AuthenticationsService = require('./services/authentications/authenticationsService');
const ArticlesService = require('./services/articles/articlesService');
const TokenManager = require('./tokenize/TokenManager');
const ClientError = require('./exceptions/clientError');
const UsersValidator = require('./validator/users/index');
const AuthenticationValidator = require('./validator/authentications/index');
const ArticleValidator = require('./validator/articles/index');

const init = async() => {
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();
    const articlesService = new ArticlesService();

    const server = Hapi.server({
        host: process.env.HOST,
        port: process.env.PORT,
        routes: {
            cors: {
                origin: ['*']
            }
        }
    });

    await server.register([
        {
            plugin: Jwt
        }
    ]);

    server.auth.strategy('personalblog_jwt', 'jwt', {
        keys: process.env.ACCESSTOKEN,
        verify: {
            iss: false,
            aud: false,
            sub: false,
            maxAgeSec: process.env.ACCESS_TOKEN_AGE
        },
        validate: (artifacts) => ({
            isValid: true,
            credentials: {
                id: artifacts.decoded.payload.id
            }
        })
    });

    await server.register([
        {
            plugin: users,
            options: {
                usersService,
                validator: UsersValidator
            }
        },
        {
            plugin: authentications,
            options: {
                authenticationsService,
                usersService,
                tokenManager: TokenManager,
                validator: AuthenticationValidator
            }
        },
        {
            plugin: articles,
            options: {
                articlesService,
                validator: ArticleValidator
            }
        }
    ]);

    server.ext('onPreResponse', (request, h) => {
        const { response } = request;

        if(response instanceof ClientError) {
            const newResponse = h.response({
                status: 'fail',
                message: response.message
            });
            newResponse.code(response.statusCode);
            return newResponse
        };

        return h.continue;
    });

    await server.start();
    console.log(`Server berjalan di ${server.info.uri}`);
};

init();