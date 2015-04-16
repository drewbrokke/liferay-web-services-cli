var Action = require('../lib/actionClass');

module.exports = function(roleId, callback) {
	var payload = {
		roleId: roleId
	}

	var action = new Action('/role/get-role', payload);

	action.doAction(callback);
}