require('dotenv').config();

const Hapi = require('@hapi/hapi');
const users = require('./api/users');
const authentications = require('./api/authentications');
const UsersService = require('./services/users/usersService');
const AuthenticationsService = require('./services/authentications/authenticationsService');
const TokenManager = require('./tokenize/TokenManager');
const ClientError = require('./exceptions/clientError');
const UsersValidator = require('./validator/users/index');
const AuthenticationValidator = require('./validator/authentications/index');


const init = async() => {
    const usersService = new UsersService();
    const authenticationsService = new AuthenticationsService();

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