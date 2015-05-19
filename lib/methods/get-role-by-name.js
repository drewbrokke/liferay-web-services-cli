var Method = require('../Method');

module.exports = function(roleName, companyId) {
	var payload = {
		companyId: companyId,
		name: roleName
	};

	var method = new Method('/role/get-role', payload);

	return method.invoke();
}