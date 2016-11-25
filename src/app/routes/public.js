/**
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var wrapper = require(path.resolve('src/dal/repository/wrapper'));

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