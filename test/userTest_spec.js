/**
* Module dependencies
*/
var request = require('request');
var path = require('path');
var baseUrl = 'http://localhost:3001/api/';
var fs = require('fs');
var expect = require('chai').expect;
var chai = require('chai');
var should = chai.should();

describe('Routing testing suite', function () {
    var server = require(path.resolve('src/server'));

    function auth(cb) {
        var token;
        json_obj = {
        "email":"usertest@fe.up.pt",
        "password":"123",
    };
    request.post({
        headers: {'content-type':'application/json'},
        url: baseUrl + 'user/authenticate',
        form:    json_obj
    }, function (error, response, body) {
        json = JSON.parse(body);
        return cb(json.token);
        });
    }

    describe('Test @ /user/', function (){
        it('returns status code 404', function (done) {
        request.get({
            url: baseUrl + 'user/'
        }, function (error, response, body) {
                response.statusCode.should.equal(404);
                done();
            });
        });

        it('returns status code 404', function (done) {
        request.post({
            url: baseUrl + 'user/'
        }, function (error, response, body) {
                response.statusCode.should.equal(404);
                done();
            });
        });

        it('returns status code 200 & no email message', function (done) {
            var out = '{"error":true,"message":"No email supplied"}';
            request.post({
                url: baseUrl + 'user/authenticate'
            }, function (error, response, body) {
                response.statusCode.should.equal(200);
                body.should.equal(out);
                done();
            });
        });

        it('returns status code 200 & no password message', function (done) {
            var out = '{"error":true,"message":"No password supplied"}';
            json_obj = {
                "email":"usertest@fe.up.pt"
            };
            request.post({
                url: baseUrl + 'user/authenticate',
                form: json_obj
            }, function (error, response, body) {
                response.statusCode.should.equal(200);
                body.should.equal(out);
                done();
            });
         });

         it('returns status code 200', function (done) {
            var out = '{"error":true,"message":"No password supplied"}';
            json_obj = {
                "email":"usertest@fe.up.pt",
                "password": "123"
            };
            request.post({
                url: baseUrl + 'user/authenticate',
                form: json_obj
            }, function (error, response, body) {
                response.statusCode.should.equal(200);
                body = JSON.parse(body);
                body.error.should.equal(false);
                done();
            });
         });
    });
});