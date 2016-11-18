/**
 * Module dependencies
 */
var path = require('path');
var connector = require(path.resolve('src/dal/connector/dbConnectorMySQL'));

/**
 * Repository to manage all sticky notes operations
 */
function StickyNoteRepository(){
}

/**
 * Method to create a database registry of a sticky note
 * @param jsonContent - json string with info to save
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
StickyNoteRepository.prototype.create = function(jsonContent, cb){
    var values = [jsonContent.userID, jsonContent.content, jsonContent.position, jsonContent.wbGroupID];
    connector.performQuery('CALL createStickyNote(?,?,?,?)',values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to edit a database registry of a sticky note
 * @param jsonContent - json string with info to save
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
StickyNoteRepository.prototype.edit = function(jsonContent, cb){
    var values = [jsonContent.snID, jsonContent.contentLine, jsonContent.lineID];
    connector.performQuery('CALL editStickyNote(?,?,?)',values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to delete a database registry of a sticky note
 * @param jsonContent - json string with info to save
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
StickyNoteRepository.prototype.delete = function(jsonContent, cb){
    connector.performQuery('CALL deleteStickyNote(?)', jsonContent, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to delete a database registry of a sticky note
 * @param jsonContent - json string with info to save
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
StickyNoteRepository.prototype.editStickyNoteColors = function(jsonContent, cb){
        var values = [jsonContent.snID, jsonContent.snColorID];
    connector.performQuery('CALL editColorSticky(?,?)', values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Exporting an instantiation of this
 */
module.exports = new StickyNoteRepository();