/**
 * Module dependencies
 */
var mysql = require('mysql');

/**
 * Manage all database connections and queries
 */
function DBConnectorMYSQL(){
}

/**
 * Method to establish connection with MySQL database
 */
DBConnectorMYSQL.prototype.establishConnection = function(){
    var config = require('../../database/config').database;
    this.pool  = mysql.createPool({
            connectionLimit : 10,
            host            : config.host,
            user            : config.user,
            password        : config.password,
            database        : config.name
    });
    this.pool.getConnection(function(err, connection) {
        if(err){
            console.log(err);
            process.exit(1);
        } else { 
            console.log('Connected to database!');
        }
    });
}

/**
 * Performs queries to MySQL with arguments
 * @param sqlQuery - query string
 * @param values - values to attach @ sqlQuery
 * @param cb - callback to the caller e.g. "function(err, data)"
 */
DBConnectorMYSQL.prototype.performQuery = function(sqlQuery, values, cb){
	var query = mysql.format(sqlQuery, values);
    this.pool.query(query, function(err, rows) {
        if (err) {
            cb(err, null);
        } else
            cb(null, rows[0]);
    });
}

/**
 * Performs queries to MySQL without arguments
 * @param sqlQuery - query string
 * @param cb - callback to the caller e.g. "function(err, data)"
 */
DBConnectorMYSQL.prototype.performQueryWithoutArg = function(sqlQuery, cb){
    this.pool.query(sqlQuery, function(err, rows) {
        if (err) {
            cb(err, null);
        } else
            cb(null, rows[0]);
    });
}

/**
 * Close connection to database
 */
DBConnectorMYSQL.prototype.closeConnection = function(){
    this.connection.end();
}



DBConnectorMYSQL.prototype.editSticky = function(values, cb){
    var query = ' INSERT INTO stickynoteline values' + values + 'ON DUPLICATE KEY UPDATE lineContent=VALUES(lineContent);';

    this.pool.query(query, function(err, rows) {
        if (err) {
            cb(err, null);
        } else
            cb(null, rows[0]);
    });
}


/**
 * Exporting a new instantiation of this
 */
module.exports = new DBConnectorMYSQL();