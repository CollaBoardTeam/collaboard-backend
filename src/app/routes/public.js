/**
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var wrapper = require(path.resolve('src/dal/repository/wrapper'));

// App's working 
var app = require(path.resolve('src/server.js')).app;
var jwt = require('jsonwebtoken');
// tokens testing
router.post('/auth', function(req, res) {
    var db = require(path.resolve('src/dal/connector/dbConnectorMySQL'));
    db.performQuery('select * from user where email = ? and password = ?', [req.body.email, req.body.password], function (err, data) {
        if (err)
            res.send({ err });
        else {
            var token = jwt.sign({data: data, date: new Date().getSeconds()}, app.get('superSecret'), {
                expiresIn: 30, algorithm: 'HS512'
            });

            res.send({
                error: false,
                message: token
            });
        }
    });
});

router.use(function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, app.get('superSecret'), { algorithms: ['HS512', 'HS384'] },function (err, decoded) {
            if (err) {
                res.send({
                    error: true,
                    message: err
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        res.status(403).send({
            error: true,
            message: 'No token provided'
        });
    }
});

//Get whiteboards by user id
router.get('/wbs_by_user/:userID', function (req, res, next) { //http://localhost:3000/wbs_by_user
    //var result = wrapper.getWhiteboardsByUser(req.get('userID'), function(err, data)
    var result = wrapper.getWhiteboardsByUser(req.params.userID, function(err, data){        
        if(err) {
            res.send({
                error: true,
                message: err
            });
        } else {
            res.send({
                error: false,
                message: data
            });
        }
    });
});

//Get whiteboard content by whiteboard id
router.get('/get_wb_content/:wbID', function (req, res, next) { //http://localhost:3000/get_wb_content
    //var result = wrapper.getWhiteboardContent(req.get('wbID'), function(err, data){
    var result = wrapper.getWhiteboardContent(req.params.wbID, function(err, data){        
        if(err) {
            res.send({
                error: true,
                message: err
            });
        } else {
            if (data.length !== 0){
            var modafocka = JSON.parse(data[0].result);
                res.send({
                    error: false,
                    message: modafocka
                });
            } else {
                res.send({
                    error: false,
                    message: data
                });
            }
        }
    });
});

//Get whiteboard content by whiteboard id
router.get('/get-colors', function (req, res, next) { //http://localhost:3000/get_wb_content
    //var result = wrapper.getWhiteboardContent(req.get('wbID'), function(err, data){
    var result = wrapper.getColors(function(err, data){        
        if(err) {
            res.send({
                error: true,
                message: err
            });
        } else {
            res.send({
                error: false,
                message: data
            });
        }
    });
});

module.exports = router;