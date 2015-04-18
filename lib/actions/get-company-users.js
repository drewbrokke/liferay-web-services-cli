var utils = require('../utils');

var Action = utils.getActionClass();
var companyId = utils.getCurrentCompanyId();

module.exports = function(callback) {
	var payload = {
		companyId: companyId,
		start: 0,
		end: 999999
	}

	var action = new Action('/user/get-company-users', payload);

	action.doAction(callback);
}