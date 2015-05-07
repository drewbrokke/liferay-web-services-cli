var Method = require('../Method');
var companyId = require('../utils/configUtil').getCurrentCompanyId();

module.exports = function(roleName, callback) {
	var payload = {
		companyId: companyId,
		name: roleName
	}

	var method = new Method('/role/get-role', payload);

	method.invoke(callback);
}