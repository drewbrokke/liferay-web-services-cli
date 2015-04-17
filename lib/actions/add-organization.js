var Action = require('../actionClass');

module.exports = function(name, callback) {
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

	var action = new Action('/organization/add-organization', organization);

	action.doAction(callback);
}