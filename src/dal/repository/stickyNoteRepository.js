/**
 * Module dependencies
 */
var path = require('path');
var connector = require(path.resolve('src/dal/connector/dbConnectorMySQL'));
var parallel = require('parallel-io');

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
        var length = jsonContent.stickylines.length;
        var stickieslines = jsonContent.stickylines;
        var values = [jsonContent.userid, stickieslines[0].lineContent, jsonContent.stickypositon, jsonContent.wbGroupID, jsonContent.colorID];
        var stickyid;

        var group = parallel();

        connector.performQuery('CALL createStickyNote(?,?,?,?,?)',values, group.wrap('op', function(err, data){
            return data;
        }));

        group.onAllDone(function (results) {
            var group2 = parallel();
            for (var i = 1; i < length; i++) {
                var values2 = [results['op'][0].idSticky, stickieslines[i].lineContent, stickieslines[i].linePosition];
                connector.performQuery('CALL addLineToSticky(?,?,?)',values2, group2.wrap('op' + i, function(err, data){
                    return data;
                }));
            }   

            group2.onAllDone(function (results) {
                cb(null, 'Created');
            });
            group2 = null;
        });
        group = null;
        /*connector.performQuery('CALL createStickyNote(?,?,?,?,?)',values, function(err, data){
        if (err){
            cb(err, null);
        } else {
            stickyid = data;
            stickyid = JSON.stringify(stickyid);
            var strStickyID = JSON.parse(stickyid);

            if(length > 1){
                for (i = 1; i < length; i++) { 
                    var values2 = [strStickyID[0].idSticky, stickieslines[i].lineContent, stickieslines[i].linePosition];
                    connector.performQuery('CALL addLineToSticky(?,?,?)',values2, function(err, data){
                            if (err){
                                if(i === length - 1){
                                    cb(err, null);
                                };
                            } else {
                                if(i === length - 1){
                                    cb(null, data);
                                };
                           
                         }
                        });
                }
            }
            cb(null,data);
        }
    });*/
}

/**
 * Method to edit a database registry of a sticky note
 * @param jsonContent - json string with info to save
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
StickyNoteRepository.prototype.edit = function(jsonContent, cb){

    var length = jsonContent.stickylines.length;
    var stickieslines = jsonContent.stickylines;
    var values = '(';

    for (i = 0; i < length; i++) {
        if(i === length - 1){
        values = values +  stickieslines[i].lineID + ',' +  jsonContent.stickyid + ',"' + stickieslines[i].lineContent + '"';

        }else{
            values = values +  stickieslines[i].lineID + ',' +  jsonContent.stickyid + ',"' + stickieslines[i].lineContent + '"), (';
        }
    }
    values = values + ')';

    
    connector.editSticky(values, function(err, data){
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
 * Method to edit a database registry of a sticky note's color
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