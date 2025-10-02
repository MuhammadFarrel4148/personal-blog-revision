const routes = (handler) => [
    {
        method: 'POST',
        path: '/authentications',
        handler: handler.addAuthenticationsHandler
    },
    {
        method: 'PUT',
        path: '/authentications',
        handler: handler.putAuthenticationsHandler
    }
];

module.exports = routes;