
/**
 * Module dependencies
 */
var path = require('path');
var server = require(path.resolve('src/server')).server;
var io = require('socket.io').listen(server);
var uuid = require('uuid');

io.on('connection', function (client) {
    // Outputs to console a client has connected
    console.log(client.id + ' connected...');
    
    // Outputs to console a client has disconnected
    client.on('disconnect', function () {
        console.log(client.id + ' disconnected...');
    });

    /**
     * Join whiteboard
     * @param - roomName -> Should be GUID from whiteboard, coming from frontend
     */
    client.on('join room', function (whiteboardName) {
        client.join(whiteboardName);
        console.log('joined...', whiteboardName);
    });
    
    // Create a whiteboard
    client.on('create room', function () {
        // Generate random whiteboard id
        var guid = uuid.v4();
        // Save whiteboard id to database
        
        // Join whiteboard
        client.join(guid);
        console.log(guid);
    });

    // Send specific message to a room
    client.on('send specific', function (msg, whiteboard) {
        var user = client.id;
        if (!msg){
            io.to(user).emit('error', 'msg null');
            return;
        }
            
        if (!whiteboard){
            io.to(user).emit('error', 'room null');
            return;
        } 
        client.broadcast.to(whiteboard).emit('chat message', msg);
    });

    // Echoes message to everyone
    client.on('echo', function (msg) {
        client.emit('echo', msg);
    });
});

/**
 * When user tries to create a room check if it already exists
 */
/*function roomExists(roomName) {
    for (var room in io.sockets.adapter.rooms) {
        if (room === roomName) {
            return true;
        }
    }
    return false;
}*/