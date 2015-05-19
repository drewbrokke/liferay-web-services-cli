var Method = require('../Method');

module.exports = function(companyId) {
	var payload = {
		companyId: companyId,
		parentGroupId: 0,
		site: true
	};

	var method = new Method('/group/get-groups', payload);

	return method.invoke();
}