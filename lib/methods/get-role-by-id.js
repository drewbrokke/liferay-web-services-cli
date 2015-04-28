var utils = require('../utils');

var Method = utils.getMethodClass();

module.exports = function(roleId, callback) {
	var payload = {
		roleId: roleId
	}

	var method = new Method('/role/get-role', payload);

	method.invoke(callback);
}