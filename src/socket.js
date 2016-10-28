
var path = require('path');
var server = require(path.resolve('src/server')).server;
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
        if (room === roomName) {
            return true;
        }
    }
    return false;
}