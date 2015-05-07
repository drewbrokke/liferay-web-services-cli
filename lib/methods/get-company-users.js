var Method = require('../Method');
var companyId = require('../utils/configUtil').getCurrentCompanyId();

module.exports = function(callback) {
	var payload = {
		companyId: companyId,
		start: 0,
		end: 999999
	}

	var method = new Method('/user/get-company-users', payload);

	method.invoke(callback);
}