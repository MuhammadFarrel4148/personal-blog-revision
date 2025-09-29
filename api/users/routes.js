const routes = (handler) => [
    {
        method: 'POST',
        path: '/users',
        handler: handler.addUsersHandler
    }
];

module.exports = routes;