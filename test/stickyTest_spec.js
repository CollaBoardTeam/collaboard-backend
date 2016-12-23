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

   describe('Test @ /sticky/', function (){
       
       //Create sticky
       it('returns status code 200', function (done) {
           auth(function (cb) {
            request.post({
               headers: { 'x-access-token': cb, 'Content-Type': 'application/json' },
                body: '{"userid": 1,"wbGroupID": 1,"colorID": 1,"stickypositon": 1,"stickylines": [{"lineContent": "LINE 1","linePosition": 1},{"lineContent": "LINE 2","linePosition": 2},{"lineContent": "LINE 3","linePosition": 3}]}',
                url: baseUrl + 'stickynote/create-st'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    done();
               });
           });
       });
       
       
       it('creating sticky', function (done) {
           auth(function (cb) {
            request.post({
                headers: { 'x-access-token': cb, 'Content-Type': 'application/json' },
                body: '{"userid": 1,"wbGroupID": 1,"colorID": 1,"stickypositon": 1,"stickylines": [{"lineContent": "LINE 1","linePosition": 1},{"lineContent": "LINE 2","linePosition": 2},{"lineContent": "LINE 3","linePosition": 3}]}',
                url: baseUrl + 'stickynote/create-st'
            }, function (error, response, body) {
                    response.statusCode.should.equal(200);
                    body.should.be.json; 
                    done();
               });
           });
       });
    
   });
});