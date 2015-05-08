var Method = require('../Method');

module.exports = function(emailAddress, companyId, callback) {
	var payload = {
		companyId: companyId,
		emailAddress: emailAddress
	}

	var method = new Method('/user/get-user-by-email-address', payload);

	method.invoke(callback);
}