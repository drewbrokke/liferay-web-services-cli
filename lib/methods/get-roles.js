var Method = require('../Method');

module.exports = function(types, companyId) {
	var payload = {
		companyId: companyId,
		types: types
	};

	var method = new Method('/role/get-roles', payload);

	return method.invoke();
}