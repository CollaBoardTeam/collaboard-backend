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
   
   beforeEach(function (done){
        done();
    });

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

   describe('Test @ /utility/', function (){
       it('returns status code 200', function (done) {
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'utility/get-colors'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    done();
               });
           });
       });
       
       it('returns colors', function (done) {
           var out = '{"error":false,"message":[{"idColor":1,"color":"FFEB3B"},{"idColor":2,"color":"4FC3F7"},{"idColor":3,"color":"CDDC39"},{"idColor":4,"color":"9E9E9E"},{"idColor":5,"color":"FFFFFF"},{"idColor":6,"color":"FFA726"}]}'
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'utility/get-colors'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    body.should.equal(out);
                    done();
               });
           });
       });
       
       it('return 404 error', function (done) {
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'utility/get-colors/1'
            }, function (error, response, body) {
                    response.statusCode.should.equal(404);
                    done();
               });
           });
       });

       it('return 403 error', function (done) {
           var out = '{"error":true,"message":"No token provided"}';
           request.get({
                url: baseUrl + 'utility/get-colors'
           }, function (error, response, body) {
                response.statusCode.should.equal(403);
                body.should.equal(out);
                done();
           });
       });

       it('return invalid signature', function (done) {
           var out = '{"error":true,"message":{"name":"JsonWebTokenError","message":"invalid signature"}}';
           auth(function (cb) {
               request.get({
                   headers: { 'x-access-token': cb + 'i' },
                   url: baseUrl + 'utility/get-colors'
               }, function (error, response, body) {
                   response.statusCode.should.equal(200);
                   body.should.equal(out);
                   done();
               });
           });
       });

       it('return jwt malformed', function (done) {
           var out = '{"error":true,"message":{"name":"JsonWebTokenError","message":"jwt malformed"}}';
           auth(function (cb) {
               request.get({
                   headers: { 'x-access-token': 'asdlkjaklçkjljkçlkjaSDÇLKJSAlçkdj' },
                   url: baseUrl + 'utility/get-colors'
               }, function (error, response, body) {
                   response.statusCode.should.equal(200);
                   body.should.equal(out);
                   done();
               });
           });
       });

       it('return invalid token', function (done) {
           var out = '{"error":true,"message":{"name":"JsonWebTokenError","message":"invalid token"}}';
           auth(function (cb) {
               request.get({
                   headers: { 'x-access-token': 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2pZFVzZXIiOjEsImZ1bGxOYW1lIjoidXNldGVzdCJ9XSwiZGF0ZSI6MzYsImlhdCI6MTQ4MTg4OTE1NiwiZXhwIjoxNDgxODkyNzU2fQ.ZiZ-O76s9suMv-dLuh8FlOopvOiRGCC8k3L3lDHdd50vZrDDeDqOcTkCboV0o7bX5JVm8MRepcOa7SvNW5AqsQ' },
                   url: baseUrl + 'utility/get-colors'
               }, function (error, response, body) {
                   response.statusCode.should.equal(200);
                   body.should.equal(out);
                   done();
               });
           });
       });
   });
});