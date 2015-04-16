var Action = require('../lib/actionClass');

module.exports = function(roleName, callback) {
	var payload = {
		companyId: 20152,
		name: roleName
	}

	var action = new Action('/role/get-role', payload);

	action.doAction(callback);
}