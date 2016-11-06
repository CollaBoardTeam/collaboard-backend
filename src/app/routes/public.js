/**
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var wrapper = require(path.resolve('src/dal/repository/wrapper'));

//Get whiteboards by user id
router.post('/wbs-by-user', function (req, res, next) { //http://localhost:3000/wbs-by-user
    var result = wrapper.getWhiteboardsByUser(req.body, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false,
                message: data
            });
        }
    });
});

//Get whiteboard content by whiteboard id
router.post('/get-wb-content', function (req, res, next) { //http://localhost:3000/get-wb-content
    var result = wrapper.getWhiteboardContent(req.body, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false,
                message: data
            });
        }
    });
});

module.exports = router;