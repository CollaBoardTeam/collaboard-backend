var mysql = require('mysql');

function DBConnectorMYSQL(){
}

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

DBConnectorMYSQL.prototype.performQuery = function(sqlQuery, values, cb){
	var query = mysql.format(sqlQuery, values);
    this.pool.query(query, function(err, rows) {
        if (err) {
            cb(err, null);
        } else
            cb(null, rows[0]);
    });
}

DBConnectorMYSQL.prototype.performQueryWithoutArg = function(sqlQuery, cb){
    this.pool.query(sqlQuery, function(err, rows) {
	    if (err) {
            cb(err, null);
        } else
            cb(null, rows[0]);
    });
}

DBConnectorMYSQL.prototype.closeConnection = function(){
    this.connection.end();
}

module.exports = new DBConnectorMYSQL();