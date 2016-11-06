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
    // var values = [jsonContent.message.wbID,jsonContent.message.content,jsonContent.message.position];
    var values = [jsonContent.stickyID, jsonContent.stickyIndex, jsonContent.stickyDate, jsonContent.groupID, jsonContent.userID, jsonContent.colorID];
    // Hard coded query: insert into stickynote values (stickyID, stickyIndex, stickyDate, groupID, userID, colorID);
    connector.performQuery('insert into stickynote values (?, ?, ?, ?, ?, ?);', values, function(err, data){
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
    // var values = [jsonContent.message.snID, jsonContent.message.content, jsonContent.message.position];
    var values = [jsonContent.stickyIndex, jsonContent.stickyDate, jsonContent.groupID, jsonContent.userID, jsonContent.colorID, jsonContent.stickyID];
    // Hard coded query: update stickynote set stickyIndex = 1, stickyDate = '2016-11-06', idGroupFK = 1, idUserFK = 1, idColorFK = 1 where idSticky = 2;
    connector.performQuery('update stickynote set stickyIndex = ?, stickyDate = ?, idGroupFK = ?, idUserFK = ?, idColorFK = ? where idSticky = ?;', values, function(err, data){
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
    // var snID = jsonContent.snID;
    var values = [jsonContent.stickyID];
    // Hard coded query: delete from stickynote where idSticky = 2;
    connector.performQuery('delete from stickynote where idSticky = ?;', values, function(err, data){
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