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

   describe('Test @ /whiteboard/', function (){

       //Get wbs by user
       it('returns status code 200', function (done) {
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'whiteboard/wbs-by-user/1'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    done();
               });
           });
       });
       
       it('returns wbs by user', function (done) {
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'whiteboard/wbs-by-user/1'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    body.should.json;
                    done();
               });
           });
       });

       it('return 403 error', function (done) {
           var out = '{"error":true,"message":"No token provided"}';
           request.get({
                url: baseUrl + 'whiteboard/wbs-by-user/1'
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
                   url: baseUrl + 'whiteboard/wbs-by-user/1'
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
                   url: baseUrl + 'whiteboard/wbs-by-user/1'
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
                   url: baseUrl + 'whiteboard/wbs-by-user/1'
               }, function (error, response, body) {
                   response.statusCode.should.equal(200);
                   body.should.equal(out);
                   done();
               });
           });
       });

       //Get wb content
       it('returns status code 200', function (done) {
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'whiteboard/get-wb-content/1'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    done();
               });
           });
       });
       
       it('returns wbs by user', function (done) {
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'whiteboard/get-wb-content/1'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    body.should.json;
                    done();
               });
           });
       });

       it('return 403 error', function (done) {
           var out = '{"error":true,"message":"No token provided"}';
           request.get({
                url: baseUrl + 'whiteboard/get-wb-content/1'
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
                   url: baseUrl + 'whiteboard/get-wb-content/1'
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
                   url: baseUrl + 'whiteboard/get-wb-content/1'
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
                   url: baseUrl + 'whiteboard/get-wb-content/1'
               }, function (error, response, body) {
                   response.statusCode.should.equal(200);
                   body.should.equal(out);
                   done();
               });
           });
       });

       //Create whiteboard
       it('returns status code 200', function (done) {
           auth(function (cb) {
            request.post({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'whiteboard/create-wb'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    done();
               });
           });
       });
       /*
       it('create wb', function (done) {
           auth(function (cb) {
            request.post({
                headers: { 'x-access-token': cb, 'Content-Type': 'application/x-www-form-urlencoded' },
                body: { 'layoutID': '1', 'boardName': 'asddssda', 'userID': '1' },
                url: baseUrl + 'whiteboard/create-wb'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    body.should.json;
                    done();
               });
           });
       });
       */

       it('return 403 error', function (done) {
           var out = '{"error":true,"message":"No token provided"}';
           request.post({
                url: baseUrl + 'whiteboard/create-wb'
           }, function (error, response, body) {
                response.statusCode.should.equal(403);
                body.should.equal(out);
                done();
           });
       });

   });
});