/**
 * Module dependencies
 */
var path = require('path');
var connector = require(path.resolve('src/dal/connector/dbConnectorMySQL'));

/**
 * Repository to manage all whiteboard operations
 */
function WhiteboardRepository(){
}

/**
 * Method to create a database registry of a whiteboard
 * @param jsonContent - json string with info to save
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.create = function(jsonContent, cb){
    // var values = [jsonContent.whiteboardID, jsonContent.userID];
    // Susceptible to changes!
    var values = [jsonContent.whiteboardID, jsonContent.layoutID, jsonContent.whiteboardName, jsonContent.creationDate];
    // Hard coded query: insert into whiteboard values (whiteboardID, layoutID, boardName, creationDate);
    connector.performQuery('insert into whiteboard values (?,?,?,?);', values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to return registries of a user's whiteboard
 * @param jsonContent - json string with info
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.getWhiteboardByUser = function(jsonContent, cb){
    // Hard coded query: select * from userWhiteboard where idUserFK = ?;
    connector.performQuery('select * from userWhiteboard where idUserFK = ?',jsonContent.userID, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to return a whiteboard content
 * @param jsonContent - json string with info to save
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.getWhiteboardContent = function(jsonContent, cb){
    connector.performQuery('',jsonContent.whiteboardID, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Exporting a new instantiation of this
 */
module.exports = new WhiteboardRepository();