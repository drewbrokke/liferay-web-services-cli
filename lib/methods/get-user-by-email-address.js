var Method = require('../Method');
var companyId = require('../utils/configUtil').getCurrentCompanyId();

module.exports = function(emailAddress, callback) {
	var payload = {
		companyId: companyId,
		emailAddress: emailAddress
	}

	var method = new Method('/user/get-user-by-email-address', payload);

	method.invoke(callback);
}