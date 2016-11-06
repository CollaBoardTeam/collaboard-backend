/**
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var wrapper = require(path.resolve('src/dal/repository/wrapper'));


//Create whiteboard with name
router.post('/create-wb', function (req, res, next) { //http://localhost:3000/create-wb
    var result = wrapper.createWhiteboard(req.body, function(err, data){
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

//Edit sticky note
router.post('/edit-st', function (req, res, next) { //http://localhost:3000/edit-st
    var result = wrapper.editStickyNote(req.body, function(err, data){
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

//Delete sticky note
router.post('/delete-st', function (req, res, next) { //http://localhost:3000/delete-st
    var result = wrapper.deleteStickyNote(req.body, function(err, data){
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