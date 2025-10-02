const routes = (handler) => [
    {
        method: 'POST',
        path: '/articles',
        handler: handler.addArticlesHandler,
        options: {
            auth: 'personalblog_jwt'
        }
    },
    {
        method: 'PUT',
        path: '/articles/{id}',
        handler: handler.updateArticlesHandler,
        options: {
            auth: 'personalblog_jwt'
        }
    }
];

module.exports = routes;