/**
 * Module dependencies
 */
var path = require('path');
var whiteboardRepo = require(path.resolve('src/dal/repository/whiteboardRepository'));
var stickyNoteRepo = require(path.resolve('src/dal/repository/stickyNoteRepository'));
var utilityRepo = require(path.resolve('src/dal/repository/UtilityRepository'));


/**
 * Wrapper to group all database queries in one module
 * An analogy to a generic repository
 */
function Wrapper(){
}

/**
 * Calls stickyNoteRepository to create a sticky note
 * @param jsonContent - json string with content of sticky note
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.createStickyNote = function(jsonContent, cb){
    stickyNoteRepo.create(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls stickyNoteRepository to edit a sticky note
 * @param jsonContent - json string with content of sticky note
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.editStickyNote = function(jsonContent, cb){
    stickyNoteRepo.edit(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls stickyNoteRepository to delete a sticky note
 * @param jsonContent - json string with content of sticky note
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.deleteStickyNote = function(jsonContent, cb){
    stickyNoteRepo.delete(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to create a whiteboard
 * @param jsonContent - json string with content of whiteboard
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.createWhiteboard = function(jsonContent, cb){
    whiteboardRepo.create(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to get whiteboard given a user id
 * @param jsonContent - json string with info
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.getWhiteboardsByUser = function(jsonContent, cb){
    whiteboardRepo.getWhiteboardByUser(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to get whiteboard content
 * @param jsonContent - json string with info
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.getWhiteboardContent = function(jsonContent, cb){
    whiteboardRepo.getWhiteboardContent(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to get whiteboard content
 * @param jsonContent - json string with info
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.getColors = function(jsonContent, cb){
    utilityRepo.getColors(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Exporting a new instantiation of this
 */
module.exports = new Wrapper();