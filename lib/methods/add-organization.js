var Method = require('../Method');

module.exports = function(name) {
	var organization =  {
		parentOrganizationId: 0,
		name: name,
		type: 'regular-organization',
		regionId: 0,
		countryId: 0,
		statusId: 12017,
		comments: '',
		site: false
	};

	var method = new Method('/organization/add-organization', organization);

	return method.invoke();
}