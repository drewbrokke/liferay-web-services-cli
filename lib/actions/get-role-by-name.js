var utils = require('../utils');

var Action = utils.getActionClass();
var companyId = utils.getCurrentCompanyId();

module.exports = function(roleName, callback) {
	var payload = {
		companyId: companyId,
		name: roleName
	}

	var action = new Action('/role/get-role', payload);

	action.doAction(callback);
}