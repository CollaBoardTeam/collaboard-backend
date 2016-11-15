var chai = require('chai');
var mocha = require('mocha');
var should = chai.should();
var expect = chai.expect();
var path = require('path');

var io = require('socket.io-client');

var socketUrl = 'http://localhost:3000';

describe('Sockets testing suite', function () {
    
    var server;
    var options ={
        transports: ['websocket'],
        'force new connection': true
    };

    beforeEach(function (done){
        server = require(path.resolve('src/server'));
        done();
    });
    
    it('echoes', function(done){
        var client = io.connect(socketUrl, options);
        client.once('connect', function(){
            client.once('echo', function(msg){
                msg.should.equal('hey');
                client.disconnect();
                done();
            });
            client.emit('echo', 'hey');
        });
    });

    it('send specific should throw error if message is null', function (done) {
        var client = io.connect(socketUrl, options);
        client.once('connect', function () {
            client.once('error', function (msg) {
                msg.should.equal('msg null');
                client.disconnect();
                done();
            });
            client.emit('send specific', '', 'room');
        });
    });

    it('send specific should throw error if room is null', function (done) {
        var client = io.connect(socketUrl, options);
        client.once('connect', function () {
            client.once('error', function (msg) {
                msg.should.equal('room null');
                client.disconnect();
                done();
            });
            client.emit('send specific', 'msg', '');
        });
    });
});