const routes = (handler) => [
    {
        method: 'POST',
        path: '/articles',
        handler: handler.addArticlesHandler
    }
];

module.exports = routes;