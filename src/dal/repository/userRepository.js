/**
 * Module dependencies
 */
var path = require('path');
var connector = require(path.resolve('src/dal/connector/dbConnectorMySQL'));

/**
 * Repository to manage all user operations
 */
function UserRepository() { }

/**
 * Method to create a database registry of an user
 * @param jsonContent - json string with necessary info to create a user
 * @param cb - callback to method caller e.g "function(err, data)"
 */
UserRepository.prototype.create = function (jsonContent, cb) {
    var values = [];
    connect.performQuery('', values, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to authenticate a user
 * @param jsonContent - json string with necessary info to authenticate
 * @param cb - callback to method caller e.g "function(err, data)"
 */
UserRepository.prototype.authenticate = function (jsonContent, cb) {
    var values = [];
    connect.performQuery('', values, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to invite a user to a whiteboard
 * @param jsonContent - json string with necessary info to invite
 * @param cb - callback to method caller e.g "function(err, data)"
 */
UserRepository.prototype.inviteUserToWhiteboard = function (jsonContent, cb) {
    var values = [];
    connect.performQuery('', values, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to remove a user from a whiteboard
 * @param jsonContent - json string with necessary info to remove
 * @param cb - callback to method caller e.g "function(err, data)"
 */
UserRepository.prototype.removeUserFromWhiteboard = function (jsonContent, cb) {
    var values = [];
    connect.performQuery('', values, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Exporting an instantiation of this
 */
module.exports = new UserRepository();