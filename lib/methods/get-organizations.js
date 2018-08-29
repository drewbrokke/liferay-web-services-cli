var Method = require('../Method');

module.exports = function(companyId, parentOrganizationId) {
	var payload = {
		companyId: companyId,
		parentOrganizationId: parentOrganizationId,
	};

	var method = new Method('/organization/get-organizations', payload);

	return method.invoke();
};