var Method = require('../Method');

module.exports = function(emailAddress, companyId) {
	var payload = {
		companyId: companyId,
		emailAddress: emailAddress
	};

	var method = new Method('/user/get-user-by-email-address', payload);

	return method.invoke();
};