var chai = require('chai');
var mocha = require('mocha');
var should = chai.should();
var expect = chai.expect();

var io = require('socket.io-client');
var socketUrl = 'http://localhost:3000/socket';

describe('Sockets testing suite', function () {
    var server;
    var options = {
        transports: ['websocket'],
        'force new connection': true
    };

    beforeEach(function (done) {
        server = require('../src/server').server;
        done();
    });

    it('echoes', function (done){
        var client = io.connect(socketUrl, options);
        client.once('connect', function () {
            client.once('echo', function (msg) {
                msg.should.equal('hey');
                client.disconnect();
                done();
            });
            client.emit('echoes', 'hey');
        });
    });

    it('create room should throw exception if room name is empty', function (done) {
        var client = io.connect(socketUrl, options);
        client.once('connect', function () {
            client.once('error', function (msg) {
                msg.should.equal('null pointer');
                client.disconnect();
                done();
            });
            client.emit('create', '');
        });
    });

    it('create room should throw exception if room name already exists', function (done) {
        var client = io.connect(socketUrl, options);
        client.emit('create', 'r1');
        client.once('connect', function () {
            client.once('error', function (msg) {
                msg.should.equal('room already exists');
                client.disconnect();
                done();
            });
            client.emit('create', 'r1');
        });
    });
});