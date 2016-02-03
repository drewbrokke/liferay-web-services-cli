var generatorUtil = require('../utils/generatorUtil');

function get() {
	// Method configuration object
	var UserGroup = {
		'add-user-group': {
			omitFromResultsDisplayKeys: ['createDate', 'description', 'lastPublishDate', 'modifiedDate', 'mvccVersion', 'parentUserGroupId', 'uuid', 'userName'],
			params: {
				name: generatorUtil.generateUserGroupName()
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