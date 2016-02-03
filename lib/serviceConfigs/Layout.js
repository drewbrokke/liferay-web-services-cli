var Chance = require('chance');
var chance = new Chance();

function get() {
	// Re-used generated data
	var layoutName = 'LWS Layout: ' + chance.capitalize(chance.word());

	// Re-used Display Keys Omissions
	var OMIT_KEYS = ['colorSchemeId', 'createDate', 'css', 'description', 'descriptionCurrentValue', 'groupId', 'iconImageId', 'keywords', 'keywordsCurrentValue', 'lastPublishDate', 'layoutPrototypeUuid', 'modifiedDate', 'mvccVersion', 'name', 'plid', 'priority', 'robots', 'robotsCurrentValue', 'sourcePrototypeLayoutUuid', 'themeId', 'title', 'typeSettings', 'userId', 'userName', 'uuid', 'wapColorSchemeId', 'wapThemeId'];

	// Method configuration object
	var Layout = {
		'add-layout': {
			omitFromResultsDisplayKeys: OMIT_KEYS,
			params: {
				name: layoutName,
				title: layoutName,
				type: 'portlet'
			},
			requiredParams: ['groupId']
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