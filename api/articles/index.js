const routes = require('./routes');
const ArticlesHandler = require('./handler');

module.exports = {
    name: 'articles',
    version: '1.0.0',
    register: async(server, { articlesService, validator }) => {
        const articlesHandler = new ArticlesHandler(articlesService, validator);
        server.route(routes(articlesHandler));
    }
};