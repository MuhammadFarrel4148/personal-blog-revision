const routes = (handler) => [
    {
        method: 'POST',
        path: '/authentications',
        handler: handler.addAuthenticationsHandler
    }
];

module.exports = routes;