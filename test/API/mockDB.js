var path = require('path');
var connector = require(path.resolve('src/dal/connector/dbConnectorMySQL'));


function MockDB(){
    
}

/**
 * Exporting an instantiation of this
 */
module.exports = new MockDB();
