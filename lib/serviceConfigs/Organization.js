var Chance = require('chance');
var chance = new Chance();

function get() {
	// Re-used Display Keys Omissions
	var OMIT_KEYS = ['comments', 'countryId', 'createDate', 'logoId', 'modifiedDate', 'mvccVersion', 'regionId', 'statusId', 'userId', 'userName', 'uuid'];

	// Method configuration object
	var Organization = {
		'add-organization': {
			omitFromResultsDisplayKeys: OMIT_KEYS,
			params: {
				name: 'LWS Organization: ' + chance.capitalize(chance.word()),
				statusId: 12017,
				type: 'organization'
			},
			requiredParams: []
		}
	};

	return Organization;
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