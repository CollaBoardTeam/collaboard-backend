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
 * @param jsonContent - json string with user id
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.getWhiteboardByUser = function(jsonContent, cb){
    var values = [jsonContent.userID];
    connector.performQuery('CALL whiteBoardByUser(?)', values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to return a whiteboard content
 * @param jsonContent - json string with whiteboard id
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.getWhiteboardContent = function(jsonContent, cb){
    var values = [jsonContent.wbID];
    connector.performQuery('CALL getWhiteboardContent(?)', values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to delete a whiteboard
 * @param jsonContent - json string with whiteboard id
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.delete = function(jsonContent, cb){
    values = [jsonContent.wbid,jsonContent.userid];
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
 * Method to add a new group to whiteboard
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
 * Method to change whiteboard name
 * @param jsonContent - json string with new whiteboard name nad whiteboard id
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
 * Method to change group name
 * @param jsonContent - json string with group id
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
 * Method to delete a group
 * @param jsonContent - json string with group id
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.deleteGroup = function(jsonContent, cb){
    var values = [jsonContent.groupid];
    connector.performQuery('CALL deletegroup(?)', values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}


/**
 * Method to add a sticky to a group
 * @param jsonContent - json string with group id and sticky id
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.addStickyToGroup = function(jsonContent, cb){
    var values = [ jsonContent.stickyid , jsonContent.groupid ];
    connector.performQuery('CALL addStickyNoteToGroup(?,?)', values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}


/**
 * Method to change whiteboard state to locked
 * @param jsonContent - json string with whiteboard id
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.changeStateWhiteboard = function(jsonContent, cb){
    values = [jsonContent.wbid];
    connector.performQuery('CALL changeStateWB(?)', values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to set a layout to a whiteboard
 * @param jsonContent - json string with whiteboard id and layout id
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.setLayout = function(jsonContent, cb){
    values = [ jsonContent.layoutid, jsonContent.wbid ];
    connector.performQuery('CALL setLayoutWB(?,?)', values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to create a new layout to a whiteboard
 * @param jsonContent - json string with whiteboard id and layout content
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.createNewLayoutToWhiteboard = function(jsonContent, cb){
    values = [ jsonContent.wdid, jsonContent.layoutname ];
    connector.performQuery('CALL createLayoutWB(?,?)', values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            var layoutid = data;
            layoutid = JSON.stringify(layoutid);
            var strLayoutID = JSON.parse(layoutid);

            
            var length = jsonContent.subtitles.length;
            var subtitles = jsonContent.subtitles;
            var values = '(';

            for (i = 0; i < length; i++) {
                if(i === length - 1){
                values = values + 'null,' +  strLayoutID[0].idLayout + ',' + subtitles[i].lineIndex + ',"' + subtitles[i].subtitle + '"';

                }else{
                    values = values + 'null,' +  strLayoutID[0].idLayout + ',' + subtitles[i].lineIndex + ',"' + subtitles[i].subtitle + '"), (';
                }
            }
            values = values + ')';

            
            connector.addSubtitleToLayout(values, function(err, data) { });

            cb(null, data);

        }
    });
}

/**
 * Method to get users of a specific whiteboard
 * @param jsonContent - json string with whiteboard id
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
WhiteboardRepository.prototype.getWhiteboardUsers = function(jsonContent, cb){
    var wbid = parseInt(jsonContent.wbid);
    connector.performQuery('call getUsersWB(?);', wbid, function(err, data){
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