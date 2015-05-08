var Method = require('../Method');

module.exports = function(companyId, callback) {
	var payload = {
		companyId: companyId,
		parentGroupId: 0,
		site: true
	};

	var method = new Method('/group/get-groups', payload);

	method.invoke(callback);
}