/**
 * Module dependencies
 */

var wrapper = require('../../../dal/repository/wrapper');

function StickyNoteController() {
}

StickyNoteController.prototype.createStickyNote = function (req, res) {
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

StickyNoteController.prototype.editStickyNote = function (req, res) {
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

StickyNoteController.prototype.deleteStickyNote = function (req, res) {
    var result = wrapper.deleteStickyNote(req.params, function(err, data){
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

StickyNoteController.prototype.editStickyNoteColor = function (req, res) {
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

StickyNoteController.prototype.addStickyToGroup = function (req, res) {
    var result = wrapper.addStickyToGroup(req.body, function(err, data){
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
module.exports = new StickyNoteController();