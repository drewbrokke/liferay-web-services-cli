var generatorUtil = require('../utils/generatorUtil');

function get() {
	// Re-used generated data
	var PERSON = generatorUtil.generateUserInfo();

	// Re-used Display Keys Omissions
	var OMIT_KEYS = ['comments', 'createDate', 'facebookId', 'failedLoginAttempts', 'graceLoginCount', 'greeting', 'jobTitle', 'languageId', 'lastFailedLoginDate', 'lastLoginDate', 'lastLoginIP', 'ldapServerId', 'lockoutDate', 'loginDate', 'loginIP', 'middleName', 'modifiedDate', 'mvccVersion', 'openId', 'portraitId', 'reminderQueryAnswer', 'reminderQueryQuestion', 'status', 'timeZoneId', 'uuid'];

	var User = {
		'add-group-users': {
			omitFromResultsDisplayKeys: [],
			params: {},
			requiredParams: ['groupId', 'userIds']
		},
		'add-role-users': {
			omitFromResultsDisplayKeys: [],
			params: {},
			requiredParams: ['roleId', 'userIds']
		},
		'add-user': {
			omitFromResultsDisplayKeys: OMIT_KEYS,
			params: {
				birthdayDay: 1,
				birthdayMonth: 1,
				birthdayYear: 1901,
				emailAddress: PERSON.emailAddress,
				firstName: PERSON.firstName,
				lastName: PERSON.lastName,
				male: PERSON.male,
				password1: 'test',
				password2: 'test',
				screenName: PERSON.screenName
			},
			requiredParams: []
		},
		'delete-user': {
			omitFromResultsDisplayKeys: [],
			params: {},
			requiredParams: ['userId']
		},
		'get-company-users': {
			omitFromResultsDisplayKeys: OMIT_KEYS,
			params: {},
			requiredParams: []
		}
	};

	return User;
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