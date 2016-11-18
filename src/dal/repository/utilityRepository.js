/**
 * Module dependencies
 */
var path = require('path');
var connector = require(path.resolve('src/dal/connector/dbConnectorMySQL'));

/**
 * Repository to manage all sticky notes operations
 */
function UtilityRepository(){
}

/**
 * Method to create a database registry of a sticky note
 * @param cb - callback to method caller e.g. "function(err, data)"
 */
UtilityRepository.prototype.getColors = function(cb){
    var values;
    connector.performQueryWithoutArg('CALL getColors()', function(err, data){
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
module.exports = new UtilityRepository();