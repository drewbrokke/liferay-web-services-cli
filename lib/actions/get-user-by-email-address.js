var utils = require('../utils');

var Action = utils.getActionClass();
var companyId = utils.getCurrentCompanyId();

module.exports = function(emailAddress, callback) {
	var payload = {
		companyId: companyId,
		emailAddress: emailAddress
	}

	var action = new Action('/user/get-user-by-email-address', payload);

	action.doAction(callback);
}