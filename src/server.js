/**
 * Module dependencies
 */
var app = require('express')();
var http = require('http');
var logger = require('morgan');
var path = require('path');

/**
 * Server configuration
 */
var port = 3000;
var server = exports.server = http.createServer(app).listen(port, function () {
    console.log('Magic happening at port', port);
});

// Express configuration
app.use(logger('dev'));

// Declare routes
var index = require('./app/routes/index');

// Declare routes endpoints
app.use('/', index);

// Sockets declaration
require(path.resolve('src/socket.js'));

// Need to export close server due to testing
module.exports = {
    close: function (){
        server.close();
    }
};