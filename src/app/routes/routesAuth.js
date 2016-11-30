module.exports = function (app) {
    var module = { };

    var authenticator = require('../../authentication/authenticator')(app);
    var public = require('./routesController/publicController');
    var private = require('./routesController/privateController');

    module.test = function (req, res) {
        res.json({ message: 'Success!' });
    }

    // Holds relevant endpoints to authorize
    module.routes = [
        {
            name: 'Authenticate',
            type: 'POST',
            location: '/authenticate',
            middleware: [],
            action: function (req, res) { authenticator.auth(req, res); }
        },
        {
            name: 'WhiteboardsByUser',
            type: 'GET',
            location: '/public/wbs_by_user/:userID',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { public.getWhiteboardsByUser(req, res); }
        },
        {
            name: 'WhiteboardContent',
            type: 'GET',
            location: '/public/get_wb_content/:wbID',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { public.getWhiteboardContent(req, res); }
        },
        {
            name: 'CreateWhiteboard',
            type: 'POST',
            location: '/private/create_wb',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.createWhiteboard(req, res); }
        },
        {
            name: 'DeleteWhiteboard',
            type: 'DELETE',
            location: '/private/delete_wb/:wbid/:userid',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.deleteWhiteboard(req, res); }
        },
        {
            name: 'ChangeWhiteboardName',
            type: 'PUT',
            location: '/private/change_wb_name',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.changeWhiteboardName(req, res); }
        },
        {
            name: 'GetColors',
            type: 'GET',
            location: '/public/get_colors/',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { public.getColors(req, res); }
        },
        {
            name: 'CreateStickyNote',
            type: 'POST',
            location: '/private/create_st',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.createStickyNote(req, res); }
        },
        {
            name: 'EditStickyNote',
            type: 'PUT',
            location: '/private/edit_st',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.editStickyNote(req, res); }
        },
        {
            name: 'DeleteStickyNote',
            type: 'DELETE',
            location: '/private/delete_st/:stickyID',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.deleteStickyNote(req, res); }
        },
        {
            name: 'EditStickyNoteColor',
            type: 'PUT',
            location: '/private/edit_st_color',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.editStickyNoteColor(req, res); }
        },
        {
            name: 'AddGroupToWhiteboard',
            type: 'POST',
            location: '/private/add_group_wb',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.addGroupToWhiteboard(req, res); }
        },
        {
            name: 'EditGroupName',
            type: 'PUT',
            location: '/private/change_group_name',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.editGroupName(req, res); }
        },
        {
            name: 'DeleteGroup',
            type: 'DELETE',
            location: '/private/delete_group/:groupid',
            middleware: [authenticator.checkAuth],
            action: function (req, res) { private.deleteGroup(req, res); }
        } 
    ]   

    return module;
}