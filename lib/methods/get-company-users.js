var Method = require('../Method');

module.exports = function(companyId, callback) {
	var payload = {
		companyId: companyId,
		start: 0,
		end: 999999
	};

	var method = new Method('/user/get-company-users', payload);

	method.invoke(callback);
}