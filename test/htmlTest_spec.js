/**
 * Module dependencies
 */
var request = require('request');
var path = require('path');
var baseUrl = 'http://localhost:3000';
var fs = require('fs');
var expect = require('chai').expect;

describe('Routing testing suite', function () {
    var server = require(path.resolve('src/server'));
    
    // Get request at /
    describe('Get /', function () {
        it('return status code 200', function (done) {
            request.get(baseUrl, function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('returns rooms.html', function (done) {
            request.get(baseUrl, function (error, response, body) {
                var file = fs.readFileSync(path.resolve('src/app/html/rooms.html'), 'utf8');
                expect(body).to.equal(file);
                done();
            });
        });
    });

    // Get request at /socket
    describe('Get /socket', function () {
        it('returns status code 200', function (done) {
            request.get(baseUrl + '/socket', function (error, response, body) {
                expect(response.statusCode).to.equal(200);
                done();
            });
        });

        it('returns index.html', function (done) {
            request.get(baseUrl + '/socket', function (error, response, body) {
                var file = fs.readFileSync(path.resolve('src/app/html/index.html'), 'utf8');
                expect(body).to.equal(file);
                done();
            });
        });
    });
});