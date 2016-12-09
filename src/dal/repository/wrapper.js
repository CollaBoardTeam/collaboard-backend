/**
 * Module dependencies
 */
var path = require('path');
var whiteboardRepo = require(path.resolve('src/dal/repository/whiteboardRepository'));
var stickyNoteRepo = require(path.resolve('src/dal/repository/stickyNoteRepository'));
var utilityRepo = require(path.resolve('src/dal/repository/utilityRepository'));
var userRepo = require(path.resolve('src/dal/repository/userRepository'));

/**
 * Wrapper to group all database queries in one module
 * An analogy to a generic repository
 */
function Wrapper(){
}

//###############################################################//
//###################    STICKY NOTES    ########################//
//###############################################################//

/**
 * Calls stickyNoteRepository to create a sticky note
 * @param jsonContent - json string with content of sticky note
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.createStickyNote = function(jsonContent, cb){
    stickyNoteRepo.create(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls stickyNoteRepository to edit a sticky note
 * @param jsonContent - json string with the new information of sticky note
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.editStickyNote = function(jsonContent, cb){
    stickyNoteRepo.edit(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls stickyNoteRepository to delete a sticky note
 * @param jsonContent - json string with sticky note id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.deleteStickyNote = function(jsonContent, cb){
    stickyNoteRepo.delete(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls sticky note repository to change sticky note color
 * @param jsonContent - json string with info
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.editStickyNoteColor = function(jsonContent, cb){
    stickyNoteRepo.editStickyNoteColors(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

//###############################################################//
//###################     WHITEBOARD     ########################//
//###############################################################//

/**
 * Calls whiteboardRepository to create a whiteboard
 * @param jsonContent - json string with content of whiteboard
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.createWhiteboard = function(jsonContent, cb){
    whiteboardRepo.create(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to get whiteboard given a user id
 * @param jsonContent - json string with user id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.getWhiteboardsByUser = function(jsonContent, cb){
    whiteboardRepo.getWhiteboardByUser(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to get whiteboard content
 * @param jsonContent - json string with whiteboard id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.getWhiteboardContent = function(jsonContent, cb){
    whiteboardRepo.getWhiteboardContent(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboard repository to delete a whiteboard
 * @param jsonContent - json string with whiteboard id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.deleteWhiteboard = function(jsonContent, cb){
    whiteboardRepo.delete(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboard repository to add a group to whiteboard
 * @param jsonContent - json string with content of group and whiteboard id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.addGroupToWhiteboard = function(jsonContent, cb){
    whiteboardRepo.addGroup(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}


/**
 * Calls whiteboard repository to change whiteboard name
 * @param jsonContent - json string with content of whiteboard id and name
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.editWhiteboardName = function(jsonContent, cb){
    whiteboardRepo.editWhiteboardName(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboard repository to change group name
 * @param jsonContent - json string with content of group id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.editGroupName = function(jsonContent, cb){
    whiteboardRepo.editGroupName(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}


/**
 * Calls whiteboard repository to delete a group
 * @param jsonContent - json string with content of group id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.deleteGroup = function(jsonContent, cb){
    whiteboardRepo.deleteGroup(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to add a sticky to group
 * @param jsonContent - json string with content of group id and sticky id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.addStickyToGroup = function(jsonContent, cb){
    whiteboardRepo.addStickyToGroup(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to lock or unlock whiteboard changes
 * @param jsonContent - json string with content whiteboard id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.changeStateWhiteboard = function(jsonContent, cb){
    whiteboardRepo.changeStateWhiteboard(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to add an existing layout to a whiteboard
 * @param jsonContent - json string with content whiteboard id and layout id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.setWhiteboardLayout = function(jsonContent, cb){
    whiteboardRepo.setLayout(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to create a new layout for a whiteboard
 * @param jsonContent - json string with layout content and whiteboard id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.createLayoutWhiteboard = function(jsonContent, cb){
    whiteboardRepo.createNewLayoutToWhiteboard(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls whiteboardRepository to get whiteboard users
 * @param jsonContent - json string with whiteboard id
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.getWhiteboardUsers = function(jsonContent, cb){
    whiteboardRepo.getWhiteboardUsers(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

//###############################################################//
//###################       UTILS        ########################//
//###############################################################//

/**
 * Calls utility repository  to get all avaiable colors to sticky
 * @param jsonContent - empty json object
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.getColors = function(jsonContent, cb){
    utilityRepo.getColors(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Calls utility repository to get all avaiable layouts
 * @param jsonContent - empty json object
 * @param cb - callback to the method caller e.g. "function (err, data)"
 */
Wrapper.prototype.getLayouts = function(jsonContent, cb){
    utilityRepo.getLayouts(jsonContent, function(err, data){
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

//###############################################################//
//###################        USER        ########################//
//###############################################################//

/**
 * Method to create a database registry of an user
 * @param jsonContent - json string with necessary info to create a user
 * @param cb - callback to method caller e.g "function(err, data)"
 */
Wrapper.prototype.createUser = function (jsonContent, cb) {
    userRepo.create(jsonContent, function (err, data) {
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
Wrapper.prototype.authenticateUser = function (jsonContent, cb) {
    userRepo.authenticate(jsonContent, function (err, data) {
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
Wrapper.prototype.inviteUserToWhiteboard = function (jsonContent, cb) {
    userRepo.inviteUserToWhiteboard(jsonContent, function (err, data) {
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
Wrapper.prototype.removeUserFromWhiteboard = function (jsonContent, cb) {
    userRepo.removeUserFromWhiteboard(jsonContent, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to check if a user has whiteboard invitations
 * @param jsonContent - json string with user id
 * @param cb - callback to method caller e.g "function(err, data)"
 */
Wrapper.prototype.checkInvitations = function (jsonContent, cb) {
    userRepo.checkInvitations(jsonContent, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to accept invitation
 * @param jsonContent - json string with invitation id, whiteboard id and user id
 * @param cb - callback to method caller e.g "function(err, data)"
 */
Wrapper.prototype.acceptInvitation = function (jsonContent, cb) {
    userRepo.acceptInvitation(jsonContent, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to decline invitation
 * @param jsonContent - json string with invitation id
 * @param cb - callback to method caller e.g "function(err, data)"
 */
Wrapper.prototype.declineInvitation = function (jsonContent, cb) {
    userRepo.declineInvitation(jsonContent, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Method to decline invitation
 * @param jsonContent - json string with invitation id
 * @param cb - callback to method caller e.g "function(err, data)"
 */
Wrapper.prototype.getWhiteboardUsers = function (jsonContent, cb) {
    whiteboardRepo.getWhiteboardUsers(jsonContent, function (err, data) {
        if (err) {
            cb(err, null);
        } else {
            cb(null, data);
        }
    });
}

/**
 * Exporting a new instantiation of this
 */
module.exports = new Wrapper();