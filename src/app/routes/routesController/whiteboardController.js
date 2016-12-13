/**
 * Module dependencies
 */

var wrapper = require('../../../dal/repository/wrapper');

function WhiteboardController() {
}

WhiteboardController.prototype.createWhiteboard = function (req, res) {
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
}

WhiteboardController.prototype.getWhiteboardsByUser = function (req, res) {
    var result = wrapper.getWhiteboardsByUser(req.params, function(err, data){
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
}

WhiteboardController.prototype.getWhiteboardContent = function (req, res) {
    var result = wrapper.getWhiteboardContent(req.params, function(err, data){
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
}



WhiteboardController.prototype.deleteWhiteboard = function (req, res){
    var result = wrapper.deleteWhiteboard(req.params, function(err, data){
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
}

WhiteboardController.prototype.editWhiteboardName = function (req, res) {
    var result = wrapper.editWhiteboardName(req.body, function(err, data){
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
}

WhiteboardController.prototype.changeStateWhiteboard = function (req, res) {
    var result = wrapper.changeStateWhiteboard(req.body, function(err, data){
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
}

WhiteboardController.prototype.setWhiteboardLayout = function (req, res) {
    var result = wrapper.setWhiteboardLayout(req.body, function(err, data){
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
}

WhiteboardController.prototype.getWhiteboardUsers = function (req, res) {
    var result = wrapper.getWhiteboardUsers(req.params, function(err, data){
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
}




/**
 * Exporting object
 */
module.exports = new WhiteboardController();