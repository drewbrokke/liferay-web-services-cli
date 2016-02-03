var Chance = require('chance');
var chance = new Chance();

function get() {
	// Method configuration object
	var UserGroup = {
		'add-user-group': {
			omitFromResultsDisplayKeys: ['createDate', 'description', 'lastPublishDate', 'modifiedDate', 'mvccVersion', 'parentUserGroupId', 'uuid', 'userName'],
			params: {
				name: 'LWS User Group: ' + chance.capitalize(chance.word())
			},
			requiredParams: []
		}
	};

	return UserGroup;
}

// Template
var template = {

'method-name': {
	omitFromResultsDisplayKeys: [],
	params: {},
	requiredParams: []
}

};

module.exports = get;