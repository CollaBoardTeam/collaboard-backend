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

   describe('Get @ /utility/', function (){
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
   });
});