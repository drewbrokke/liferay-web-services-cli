var Method = require('../Method');

module.exports = function(companyId) {
	var payload = {
		companyId: companyId,
		parentOrganizationId: 0,
	};

	var method = new Method('/organization/get-organizations', payload);

	return method.invoke();
};