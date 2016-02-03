var Chance = require('chance');
var chance = new Chance();

function get() {
	// Re-used Display Keys Omissions
	var OMIT_KEYS = ['key', 'mvccVersion'];

	// Method configuration object
	var Layout = {
		'get-company-by-mx': {
			omitFromResultsDisplayKeys: OMIT_KEYS,
			params: {},
			requiredParams: ['mx']
		}
	};

	return Layout;
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