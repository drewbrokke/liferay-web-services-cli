var Method = require('../Method');

module.exports = function(roleId, companyId) {
	// companyId is not used

	var payload = {
		roleId: roleId
	};

	var method = new Method('/role/get-role', payload);

	return method.invoke();
};