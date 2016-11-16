/**
 * Module dependencies
 */
var app = require('express')();
var http = require('http');
var logger = require('morgan');
var path = require('path');
var bodyParser = require('body-parser');



/**
 * Server configuration
 */
var port = 3000;
var server = exports.server = http.createServer(app).listen(port, function () {
    console.log('Magic happening at port', port);
});

// Express configuration
app.use(logger('dev'));

// Json body parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// Declare routes
var index = require('./app/routes/index');
var public = require('./app/routes/public');
var private = require('./app/routes/private');


// Declare routes endpoints
app.use('/', index); //http//localhost:3000/
app.use('/public', public);
app.use('/private', private);

// Sockets declaration
require(path.resolve('src/socket.js'));
require(path.resolve('src/dal/connector/dbConnectorMySQL')).establishConnection();


// Need to export close server due to testing
module.exports = {
    close: function (){
        server.close();
    }
};