var path = require('path');
var connector = require(path.resolve('src/dal/connector/dbConnectorMySQL'));

function StickyNoteRepository(){
}

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

module.exports = new StickyNoteRepository();