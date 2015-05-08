var Method = require('../Method');

module.exports = function(roleName, companyId, callback) {
	var payload = {
		companyId: companyId,
		name: roleName
	};

	var method = new Method('/role/get-role', payload);

	method.invoke(callback);
}