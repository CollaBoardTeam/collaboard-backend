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
    var values = [jsonContent.message.wbID, jsonContent.message.userID];
    connector.performQuery('',values, function(err, data){
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
    connector.performQuery('',jsonContent.message.userID, function(err, data){
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
    connector.performQuery('',jsonContent.message.wbID, function(err, data){
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