const routes = require('./routes');
const UsersHandler = require('./handler');

module.exports = {
    name: 'user',
    version: '1.0.0',
        register: async(server, { usersService, validator }) => {
            const usersHandler = new UsersHandler(usersService, validator);
            server.route(routes(usersHandler)); 
        }
};
