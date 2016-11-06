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
    var values = [jsonContent.message.wbID,jsonContent.message.content,jsonContent.message.position];
    connector.performQuery('',values, function(err, data){
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
    var values = [jsonContent.message.snID, jsonContent.message.content, jsonContent.message.position];
    connector.performQuery('',values, function(err, data){
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
    var snID = jsonContent.snID;
    connector.performQuery('',snID, function(err, data){
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