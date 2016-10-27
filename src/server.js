/**
 * Module dependencies
 */
var app = require('express')();
var http = require('http');
var logger = require('morgan');

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
var test = require('./app/routes/test');

// Declare routes endpoints
app.use('/', index);
app.use('/test', test);

// Sockets declaration
var io = require('socket.io').listen(server);
io.on('connection', function (client) {
    // Outputs to console a client has connected
    console.log(client.id + ' connected...');
    
    // Outputs to console a client has disconnected
    client.on('disconnect', function () {
        console.log(client.id + ' disconnected...');
    });

    // Message to all clients
    client.on('chat message', function (msg) {
        io.emit('chat message', msg);
    });
    
    // Create a room
    client.on('create room', function (roomName) {
        var user = client.id;
        // If room name is empty throw error to caller
        if (!roomName) {
            io.to(user).emit('error', 'null pointer');
            return;
        }
        // If room name already exists
        if(roomExists(roomName)) {
            io.to(user).emit('error', 'room already exists');
            return;
        } else {
            client.join(roomName);
        }
    });

    // Send specific message to a room
    client.on('send specific', function (msg, room) {
        client.broadcast.to(room).emit('chat message', msg);
    });

    // Echoes message to everyone
    client.on('echo', function (msg) {
        client.emit('echo', msg);
    });
});

function roomExists(roomName) {
    for (var room in io.sockets.adapter.rooms) {
        if (room === roomName)
            return true;
    }
    return false;
}

// Need to export close server due to testing
module.exports = {
    closeServer: function (){
        server.close();
    }
};