var utils = require('../utils');

var Action = utils.getActionClass();

module.exports = function(roleId, callback) {
	var payload = {
		roleId: roleId
	}

	var action = new Action('/role/get-role', payload);

	action.doAction(callback);
}