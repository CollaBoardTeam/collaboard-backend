var path = require('path');
var connector = require(path.resolve('src/dal/connector/dbConnectorMySQL'));

function WhiteboardRepository(){
}

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

WhiteboardRepository.prototype.getWhiteboardByUser = function(jsonContent, cb){
    connector.performQuery('',jsonContent.message.userID, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

WhiteboardRepository.prototype.getWhiteboardContent = function(jsonContent, cb){
    connector.performQuery('',jsonContent.message.wbID, function(err, data){
        if (err){
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

module.exports = new WhiteboardRepository();