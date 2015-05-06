var Action = require('../actionClassLoop');

module.exports = function(payload, callback) {
	var url = 'firstName=' + payload.firstName + '&lastName=' + payload.lastName + '&emailAddress=' + payload.emailAddress;

	var action = new Action('/loop/people/add?', url);

	action.doAction(callback);
};