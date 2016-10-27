/**
 * Module dependencies
 */
var app = require('express')();
var http = require('http');
var logger = require('morgan');


// Server configuration
var port = 3000;
var server = exports.server = http.createServer(app).listen(port, function () {
    console.log('Magic happening at port', port);
});

// Express configuration
app.use(logger('dev'));

// Declare routes
var index = require('./app/routes/index');
var test = require('./app/routes/test');

// Declare routes endpoints
app.use('/', index);
app.use('/test', test);

// Sockets declaration
var io = require('socket.io').listen(server);
io.on('connection', function (client) {
    console.log(client.id + ' connected...');
    client.on('disconnect', function () {
        console.log(client.id + ' disconnected...');
    });
});

// Need to export close server due to testing
module.exports = {
    closeServer: function (){
        server.close();
    }
};