var Chance = require('chance');
var chance = new Chance();

var mailDomain = require('../utils/configUtil').getCurrentInstanceConfig().mailDomain;

function generateUserInfo() {
	var gender = {
		gender: 'male'
	};
	var male = chance.bool();
	var person = {};

	if (!male) {
		gender.gender = 'female';
	}

	person.firstName = chance.first(gender);
	person.lastName = chance.last();
	person.emailAddress = person.firstName + person.lastName + '@' + mailDomain;
	person.screenName = person.firstName + person.lastName;
	person.male = male;

	return person;
}

function get() {
	// Re-used generated data
	var PERSON = generateUserInfo();

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
		},
		'get-group-users': {
			omitFromResultsDisplayKeys: OMIT_KEYS,
			params: {},
			requiredParams: []
		},
		'get-user-by-email-address': {
			omitFromResultsDisplayKeys: OMIT_KEYS,
			params: {},
			requiredParams: ['emailAddress']
		},
		'get-user-by-id': {
			omitFromResultsDisplayKeys: OMIT_KEYS,
			params: {},
			requiredParams: ['userId']
		},
		'get-user-by-screen-name': {
			omitFromResultsDisplayKeys: OMIT_KEYS,
			params: {},
			requiredParams: ['screenName']
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