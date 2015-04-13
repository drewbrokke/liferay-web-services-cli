var Action = require('../actionClassConnect');

module.exports = function(payload, callback) {
	var url = 'firstName=' + payload.firstName + '&lastName=' + payload.lastName + '&emailAddress=' + payload.emailAddress;

	var action = new Action('/connect/people/add?', url);

	action.doAction(callback);
};