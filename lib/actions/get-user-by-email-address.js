var Action = require('../actionClass');

module.exports = function(emailAddress, callback) {
	var payload = {
		companyId: 20152,
		emailAddress: emailAddress
	}

	var action = new Action('/user/get-user-by-email-address', payload);

	action.doAction(callback);
}