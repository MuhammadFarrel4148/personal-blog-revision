const routes = (handler) => [
    {
        method: 'POST',
        path: '/articles',
        handler: handler.addArticlesHandler,
        options: {
            auth: 'personalblog_jwt'
        }
    }
];

module.exports = routes;