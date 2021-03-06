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

   describe('Test @ /layout/', function (){
       //Get layouts and get layouts by ID
       it('returns status code 200', function (done) {
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'layout/get-layouts'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    done();
               });
           });
       });
       
       it('returns layouts', function (done) {
           var out = '{"error":false,"message":[{"linhas":3,"idLayout":1,"layoutName":"noLayout"}]}'
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'layout/get-layouts'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                     body.should.be.json; 
                    done();
               });
           });
       });
       
       it('return 200 error', function (done) {
           auth(function (cb) {
            request.get({
                headers: { 'x-access-token': cb },
                url: baseUrl + 'layout/get-layouts/1'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    done();
               });
           });
       });

       it('return 403 error', function (done) {
           var out = '{"error":true,"message":"No token provided"}';
           request.get({
                url: baseUrl + 'layout/get-layouts'
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
                   url: baseUrl + 'layout/get-layouts'
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
                   url: baseUrl + 'layout/get-layouts'
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
                   url: baseUrl + 'layout/get-layouts'
               }, function (error, response, body) {
                   response.statusCode.should.equal(200);
                   body.should.equal(out);
                   done();
               });
           });
       });


       //Create layout
       it('returns status code 200', function (done) {
           auth(function (cb) {
            request.post({
               headers: { 'x-access-token': cb, 'Content-Type': 'application/json' },
                body: '{"layoutname": "layoutName","wbid": 2,"subtitles": [{"lineIndex": 1,"subtitle": "sa das asd ads"}, {"lineIndex": 2,"subtitle": "ads ads"}, {"lineIndex": 3,"subtitle": "subtitlsad asd asdsade2"}, {"lineIndex": 4,"subtitle": "subtitasddsadsadasdsa dsaads le2"}]}',
                url: baseUrl + 'layout/create-wb-layout'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    done();
               });
           });
       });
       
       it('creating layout', function (done) {
           auth(function (cb) {
            request.post({
                headers: { 'x-access-token': cb, 'Content-Type': 'application/json' },
                body: '{"layoutname": "layoutName","wbid": 2,"subtitles": [{"lineIndex": 1,"subtitle": "sa das asd ads"}, {"lineIndex": 2,"subtitle": "ads ads"}, {"lineIndex": 3,"subtitle": "subtitlsad asd asdsade2"}, {"lineIndex": 4,"subtitle": "subtitasddsadsadasdsa dsaads le2"}]}',
                url: baseUrl + 'layout/create-wb-layout'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    body.should.be.json; 
                    done();
               });
           });
       });
       
       /*
       //set layout to wb
       it('returns status code 200', function (done) {
           auth(function (cb) {
            request.post({
               headers: { 'x-access-token': cb, 'Content-Type': 'application/json' },
                body: '{"layoutname": "layoutName","wbid": 2,"subtitles": [{"lineIndex": 1,"subtitle": "sa das asd ads"}, {"lineIndex": 2,"subtitle": "ads ads"}, {"lineIndex": 3,"subtitle": "subtitlsad asd asdsade2"}, {"lineIndex": 4,"subtitle": "subtitasddsadsadasdsa dsaads le2"}]}',
                url: baseUrl + 'layout/set-wb-layout'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    done();
               });
           });
       });
       
       it('set layout', function (done) {
           auth(function (cb) {
            request.put({
                headers: { 'x-access-token': cb, 'Content-Type': 'application/x-www-form-urlencoded' },
                body: { 'layoutid': 1, 'wbid': 1 },
                url: baseUrl + 'whiteboard/set-wb-layout'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    body.should.be.json; 
                    done();
               });
           });
       });
*/
   });
});