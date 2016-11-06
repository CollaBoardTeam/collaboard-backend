var path = require('path');
var whiteboardRepo = require(path.resolve('src/dal/repository/whiteboardRepository'));
var stickyNoteRepo = require(path.resolve('src/dal/repository/stickyNoteRepository'));

function Wrapper(){
}

Wrapper.prototype.createStickyNote = function(jsonContent, cb){
    stickyNoteRepo.create('',jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

Wrapper.prototype.editStickyNote = function(jsonContent, cb){
    stickyNoteRepo.edit('',jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

Wrapper.prototype.deleteStickyNote = function(jsonContent){
    stickyNoteRepo.delete('',jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

Wrapper.prototype.createWhiteboard = function(jsonContent){
    whiteboardRepo.create('',jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

Wrapper.prototype.getWhiteboardsByUser = function(jsonContent){
    whiteboardRepo.getWhiteboardByUser('',jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

Wrapper.prototype.getWhiteboardContent = function(jsonContent){
    whiteboardRepo.getWhiteboardContent('',jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

module.exports = new Wrapper();