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
    var values = [jsonContent.userID, jsonContent.content, jsonContent.position, jsonContent.wbGroupID, jsonContent.colorID];
    connector.performQuery('CALL createStickyNote(?,?,?,?,?)',values, function(err, data){
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
    var values = [ jsonContent.snID, jsonContent.contentLine, jsonContent.lineID];
    connector.performQuery('CALL editStickyNote(?,?,?)',values, function(err, data){
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
/*
StickyNoteRepository.prototype.edit2 = function(jsonContent, cb){

    var jsonString = "{\n\t\"stickyid\": 1,\n\t\"stickypositon\": 2,\n\t\"stickylines\": [{\n\t\t\"lineID\": 1,\n\t\t\"lineContent\": \"ola\",\n\t\t\"linePosition\": 1\n\t}, {\n\t\t\"lineID\": 2,\n\t\t\"lineContent\": \"sdasad\",\n\t\t\"linePosition\": 2\n\t}, {\n\t\t\"lineID\": 3,\n\t\t\"lineContent\": \"odsaadsadsdsadsla\",\n\t\t\"linePosition\": 3\n\t}]\n}";
    var json = JSON.parse(jsonString);
    var length = json.stickylines.length;
    for (i = 0; i < length; i++) { 
        console.log(json.stickylines[i]);
        var values = [ json.stickyid, json.stickylines[i].lineID, json.stickylines[i].lineContent ];

        connector.performQuery('CALL editStickyNote(?,?,?)',values, function(err, data){
            if (err){
                cb(err, null);
            } else {
                cb(null, data);
            }
        });
    }
}
*/

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