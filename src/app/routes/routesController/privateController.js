/**
 * Module dependencies
 */

var wrapper = require('../../../dal/repository/wrapper');

function PrivateController() {
}

/**
 * Whiteboard functions
 */
PrivateController.prototype.createWhiteboard = function (req, res) {
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

PrivateController.prototype.deleteWhiteboard = function (req, res){
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
}

PrivateController.prototype.changeWhiteboardName = function (req, res) {
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

/**
 * StickyNote functions
 */
PrivateController.prototype.createStickyNote = function (req, res) {
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
}

PrivateController.prototype.editStickyNote = function (req, res) {
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
}

PrivateController.prototype.deleteStickyNote = function (req, res) {
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
}

PrivateController.prototype.editStickyNoteColor = function (req, res) {
    var result = wrapper.editStickyNoteColor(req.body, function(err, data){
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
 * Group functions
 */
PrivateController.prototype.addGroupToWhiteboard = function (req, res) {
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
}

PrivateController.prototype.editGroupName = function (req, res) {
    var result = wrapper.editGroupName(req.body, function(err, data){
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

PrivateController.prototype.deleteGroup = function (req, res) {
    var result = wrapper.deleteGroup(req.params.groupid, function(err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: 'Group deleted!'
            });
        }
    });
}

/**
 * Exporting object
 */
module.exports = new PrivateController();