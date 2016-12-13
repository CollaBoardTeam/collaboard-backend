/**
 * Module dependencies
 */

var wrapper = require('../../../dal/repository/wrapper');

function UserController() {
}

UserController.prototype.createUser = function (req, res) {
    var result = wrapper.createUser(req.body, function (err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: data
            });
        }
    });
}

UserController.prototype.authenticateUser = function (req, res, cb) {
    var result = wrapper.authenticateUser(req.body, function (err, data){
        if(err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

UserController.prototype.inviteUserToWhiteboard = function (req, res) {
    var result = wrapper.inviteUserToWhiteboard(req.body, function (err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: data
            });
        }
    });
}

UserController.prototype.removeUserFromWhiteboard = function (req, res) {
    var result = wrapper.removeUserFromWhiteboard(req.params, function (err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: data
            });
        }
    });
}

UserController.prototype.checkInvitations = function (req, res) {
    var result = wrapper.checkInvitations(req.params, function (err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: data
            });
        }
    });
}

UserController.prototype.acceptInvitation = function (req, res) {
    var result = wrapper.acceptInvitation(req.body, function (err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: data
            });
        }
    });
}

UserController.prototype.declineInvitation = function (req, res) {
    var result = wrapper.declineInvitation(req.params, function (err, data){
        if(err) {
            res.json({
                error: true,
                message: err
            });
        } else {
            res.json({
                error: false, 
                message: data
            });
        }
    });
}

/**
 * Exporting object
 */
module.exports = new UserController();