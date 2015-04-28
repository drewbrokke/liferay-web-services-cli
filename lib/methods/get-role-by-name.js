var utils = require('../utils');

var Method = utils.getMethodClass();
var companyId = utils.getCurrentCompanyId();

module.exports = function(roleName, callback) {
	var payload = {
		companyId: companyId,
		name: roleName
	}

	var method = new Method('/role/get-role', payload);

	method.invoke(callback);
}