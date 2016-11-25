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
    var values = [jsonContent.layoutID, jsonContent.boardName, jsonContent.userID];
    connector.performQuery('CALL createWhiteBoard(?,?,?)', values, function(err, data){
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
WhiteboardRepository.prototype.getWhiteboardByUser = function(userID, cb){
    connector.performQuery('CALL whiteBoardByUser(?)', userID, function(err, data){
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
WhiteboardRepository.prototype.getWhiteboardContent = function(wbID, cb){
    connector.performQuery('CALL getWhiteboardContent(?)', wbID, function(err, data){
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
WhiteboardRepository.prototype.delete = function(jsonContent, cb){
    values = [jsonContent.params.wbid,jsonContent.params.userid];
    var jsonContentInt = values.map(Number);
    connector.performQuery('CALL deleteWhiteboard(?,?)', jsonContentInt, function(err, data){
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
WhiteboardRepository.prototype.addGroup = function(jsonContent, cb){
    var values = [ jsonContent.wbid, jsonContent.groupname ];
    connector.performQuery('CALL createGroupWB(?,?)', values, function(err, data){
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
WhiteboardRepository.prototype.editWhiteboardName = function(jsonContent, cb){
    var values = [ jsonContent.wbid, jsonContent.newname ];
    connector.performQuery('CALL changewhiteboardname(?,?)', values, function(err, data){
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
WhiteboardRepository.prototype.editGroupName = function(jsonContent, cb){
    var values = [ jsonContent.groupid, jsonContent.newname ];
    connector.performQuery('CALL changeGroupName(?,?)', values, function(err, data){
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
WhiteboardRepository.prototype.deleteGroup = function(jsonContent, cb){
    connector.performQuery('CALL deletegroup(?)', jsonContent, function(err, data){
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