/**
 * Module dependencies
 */
var path = require('path');
var connector = require(path.resolve('src/dal/connector/dbConnectorMySQL'));

/**
 * Repository to manage other entities (colors)
 */
function UtilityRepository(){
}

/**
 * Method to get all avaiable colors
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