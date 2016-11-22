/**
 * Module dependencies
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var wrapper = require(path.resolve('src/dal/repository/wrapper'));


//Create whiteboard with name
router.post('/create-wb', function (req, res, next) { //http://localhost:3000/
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

//Create sticky note
router.post('/create-st', function (req, res, next) { //http://localhost:3000/
// Create sticky note
    var result = wrapper.createStickyNote(req.body, function(err, data){
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
router.put('/edit-st', function (req, res, next) { //http://localhost:3000/
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
router.delete('/delete-st/:stickyID', function (req, res, next) { //http://localhost:3000/
    var result = wrapper.deleteStickyNote(req.params.stickyID, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: 'Sticky Note deleted!'
            });
        }
    });
});

//Edit sticky note color
router.put('/edit-st-color', function (req, res, next) { //http://localhost:3000/
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

//Delete whiteboard
router.delete('/delete-wb', function (req, res, next) { //http://localhost:3000/
    var result = wrapper.deleteWhiteboard(req, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: 'Whiteboard deleted!'
            });
        }
    });
});

//Add new group to whiteboard
router.post('/add-group-wb', function (req, res, next) { //http://localhost:3000/
    var result = wrapper.addGroupToWhiteboard(req.body, function(err, data){
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