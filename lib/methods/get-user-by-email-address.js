var utils = require('../utils');

var Method = utils.getMethodClass();
var companyId = utils.getCurrentCompanyId();

module.exports = function(emailAddress, callback) {
	var payload = {
		companyId: companyId,
		emailAddress: emailAddress
	}

	var method = new Method('/user/get-user-by-email-address', payload);

	method.invoke(callback);
}