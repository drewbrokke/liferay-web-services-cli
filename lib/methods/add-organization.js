var Method = require('../Method');

module.exports = function(name, parentOrganizationId) {
	var organization =  {
		parentOrganizationId: parentOrganizationId,
		name: name,
		type: 'organization',
		regionId: 0,
		countryId: 0,
		statusId: 12017,
		comments: '',
		site: false
	};

	var method = new Method('/organization/add-organization', organization);

	return method.invoke();
};