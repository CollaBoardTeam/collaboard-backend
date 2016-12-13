module.exports = function (app) {
    var module = { };

    module.createRoutes = function () {
        // Create authentication routes
        var routerAuth = require('express').Router();
        var routesAuth = require('./routesAuth')(app);
        var authenticator = require('../../authentication/authenticator');

        // Attach routes to express app
        app.use('/api', buildRoutes(routesAuth.routes, routerAuth));
    }

    function buildRoutes(routes, router) {
        routes.forEach(function (route) {
                 if (route.type === 'GET') router.get(route.location, route.middleware, route.action);
            else if (route.type === 'POST') router.post(route.location, route.middleware, route.action);
            else if (route.type === 'PUT') router.put(route.location, route.middleware, route.action);
            else if (route.type === 'DELETE') router.delete(route.location, route.middleware, route.action);
            else if (route.type === 'OPTIONS') router.options(route.location, route.middleware, route.action);
        });

        return router;
    }

    return module;
}