module.exports = function (app) {
    var module = { };

    var authenticator = require('../../authentication/authenticator')(app);
    var whiteboard = require('./routesController/whiteboardController');
    var stickynote = require('./routesController/stickyNoteController');
    var layout = require('./routesController/layoutController');
    var group = require('./routesController/groupController');
    var utility = require('./routesController/utilityController');
    var user = require('./routesController/userController');

    // Holds relevant endpoints to authorize
    module.routes = [
        {
            name: 'Authenticate',
            type: 'POST',
            location: '/user/authenticate',
            middleware: [],
            action: function (req, res) { authenticator.auth(req, res); }
        },
        // ############### WHITEBOARD ##################
        {
            name: 'CreateWhiteboard',
            type: 'POST',
            location: '/whiteboard/create-wb',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { whiteboard.createWhiteboard(req, res); }
        },
        {
            name: 'GetWhiteboardsByUser',
            type: 'GET',
            location: '/whiteboard/wbs-by-user/:userID',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { whiteboard.getWhiteboardsByUser(req, res); }
        },
        {
            name: 'GetWhiteboardContent',
            type: 'GET',
            location: '/whiteboard/get-wb-content/:wbID',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { whiteboard.getWhiteboardContent(req, res); }
        },
        {
            name: 'DeleteWhiteboards',
            type: 'DELETE',
            location: '/whiteboard/delete-wb/:wbid/:userid',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { whiteboard.deleteWhiteboard(req, res); }
        },
        {
            name: 'EditWhiteboardName',
            type: 'PUT',
            location: '/whiteboard/change-wb-name',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { whiteboard.editWhiteboardName(req, res); }
        },
        {
            name: 'ChangeWhiteboardState',
            type: 'PUT',
            location: '/whiteboard/change-wb-state',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { whiteboard.changeStateWhiteboard(req, res); }
        },
        {
            name: 'SetLayoutToWhiteboard',
            type: 'PUT',
            location: '/whiteboard/set-wb-layout',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { whiteboard.setWhiteboardLayout(req, res); }
        },
        {
            name: 'GetWhiteboardUsers',
            type: 'GET',
            location: '/whiteboard/get-wb-users/:wbid',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { whiteboard.getWhiteboardUsers(req, res); }
        },
        // ################## STICKY NOTES ####################
        {
            name: 'CreateStickyNote',
            type: 'POST',
            location: '/stickynote/create-st',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { stickynote.createStickyNote(req, res); }
        },
        {
            name: 'EditStickyNote',
            type: 'PUT',
            location: '/stickynote/edit-st',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { stickynote.editStickyNote(req, res); }
        },
        {
            name: 'DeleteStickyNote',
            type: 'DELETE',
            location: '/stickynote/delete-st/:stickyID',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { stickynote.deleteStickyNote(req, res); }
        },
        {
            name: 'EditStickyNoteColor',
            type: 'PUT',
            location: '/stickynote/edit-st-color',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { stickynote.editStickyNoteColor(req, res); }
        },
        {
            name: 'AddStickyToGroup',
            type: 'PUT',
            location: '/stickynote/add-sticky-toGroup',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { stickynote.addStickyToGroup(req, res); }
        },
        // ################ LAYOUT ###################
        {
            name: 'CreateLayout',
            type: 'POST',
            location: '/layout/create-wb-layout',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { layout.createLayoutWhiteboard(req, res); }
        },
        {
            name: 'GetLayouts',
            type: 'GET',
            location: '/layout/get-layouts',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { layout.getLayouts(req, res); }
        },
        {
            name: 'GetLayoutsById',
            type: 'GET',
            location: '/layout/get-layouts/:layoutid',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { layout.getLayoutsById(req, res); }
        },
        // ############# GROUPS ###################
        {
            name: 'AddGroupToWhiteboard',
            type: 'POST',
            location: '/group/add-group-wb',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { group.addGroupToWhiteboard(req, res); }
        },
        {
            name: 'EditGroupName',
            type: 'PUT',
            location: '/group/change-group-name',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { group.editGroupName(req, res); }
        },
        {
            name: 'DeleteGroup',
            type: 'DELETE',
            location: '/group/delete-group/:groupid',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { group.deleteGroup(req, res); }
        },
        // ########### UTILITY ###############
        {
            name: 'GetColors',
            type: 'GET',
            location: '/utility/get-colors',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { utility.getColors(req, res); }
        },
        // ########## USER ################
        {
            name: 'CreateUser',
            type: 'POST',
            location: '/user/create-user',
            middleware: [],
            action: function (req, res) { user.createUser(req, res); }
        },
        {
            name: 'InviteUserToWhiteboard',
            type: 'POST',
            location: '/user/inv-user',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { user.inviteUserToWhiteboard(req, res); }
        },
        {
            name: 'RemoveUserFromWhiteboard',
            type: 'DELETE',
            location: '/user/rem-user-wb/:userid/:wbid',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { user.removeUserFromWhiteboard(req, res); }
        },
        {
            name: 'CheckInvitations',
            type: 'GET',
            location: '/user/check-inv/:userid',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { user.checkInvitations(req, res); }
        },
        {
            name: 'AcceptInvitation',
            type: 'POST',
            location: '/user/accept-inv/',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { user.acceptInvitation(req, res); }
        },
        {
            name: 'DeclineInvitation',
            type: 'DELETE',
            location: '/user/decline-inv/:invid',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { user.declineInvitation(req, res); }
        }

    ]   

    return module;
}