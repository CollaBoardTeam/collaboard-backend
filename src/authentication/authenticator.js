module.exports = function (app) {
    /**
     * Module dependencies
     */
    var module = { };
    var jwt = require('jsonwebtoken');
    var user = require('../app/routes/routesController/userController');
    
    /**
     * Authentication method 
     */
    module.auth = function (req, res) {
        // Check if email and password are supplied
        if (req.body.email && req.body.password) {
            // Check if user exists in database
            user.authenticateUser(req, res, function (err, data) {
                if(err) {
                    res.json({
                        error: true,
                        message: err
                    });
                } else {
                    // User exists
                    if (data !== undefined && data.length > 0) {
                        // Authenticate user
                        var token = jwt.sign({ user: data, date: new Date().getSeconds()}, app.get('superSecret'), {
                                expiresIn: 3600, algorithm: 'HS512'
                            });
                        // Return token to user
                        res.json({ error: false, message: token });
                    } else {
                        // Return error to user
                        res.json({ error: true, message: 'User does not exist' });
                    }
                }
            });
            /*var db = require('../dal/connector/dbConnectorMySQL');
            db.performQuery('select * from user where email = ? and password = ?;', [req.body.email, req.body.password], function (err, data) {
                if (err) {
                    res.json({ error: true, message: err });
                } else {
                    // User exists
                    if (data !== undefined) {
                        // Authenticate user
                        var token = jwt.sign({ user: data, date: new Date().getSeconds()}, app.get('superSecret'), {
                                expiresIn: 3600, algorithm: 'HS512'
                            });
                        // Return token to user
                        res.json({ error: false, message: token });
                    // User doesn't exist
                    } else {
                        // Return error to user
                        res.json({ error: true, message: 'User does not exist' });
                    }
                }
            }); */
        } else {
            // Determine what caused the error
            if (!req.body.email) var message = 'No email supplied';
            else if (!req.body.password) var message = 'No password supplied';
            // Return error to user
            res.json({ error: true, message: message });
        }
    }

    /**
     * Check for authentication
     */
    module.checkAuth = function (req, res, next) {
        // Search for token in headers and body
        var token = req.headers['x-access-token'] || req.body.token;
        // Token is not null
        if (token) {
            // Verify if token is valid
            jwt.verify(token, app.get('superSecret'), { algorithms: ['HS512', 'HS384'] }, function (err, decoded) {
                if (err) {
                    res.send({ error: true, message: err });
                } else {
                    req.token = decoded;
                    req.authenticated = true;
                    req.user = decoded.user;
                    next();
                }
            });
        // Token is null
        } else {
            // Return error to user
            res.status(403).send({ error: true, message: 'No token provided' });
        }
    }

    return module;
}