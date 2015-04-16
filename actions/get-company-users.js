var Action = require('../lib/actionClass');

module.exports = function(callback) {
	var payload = {
		companyId: 20152,
		start: 0,
		end: 999999
	}

	var action = new Action('/user/get-company-users', payload);

	action.doAction(callback);
}