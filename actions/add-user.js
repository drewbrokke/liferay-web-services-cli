var Action = require('../lib/actionClass');

module.exports = function(firstName, lastName, screenName, emailAddress, callback) {
	var user =  {
		companyId: 20152,
		autoPassword: false,
		password1: 'test',
		password2: 'test',
		autoScreenName: false,
		screenName: screenName,
		emailAddress: emailAddress,
		facebookId: 0,
		openId: '',
		locale: null,
		firstName: firstName,
		middleName: '',
		lastName: lastName,
		prefixId: 0,
		suffixId: 0,
		male: true,
		birthdayMonth: 1,
		birthdayDay: 1,
		birthdayYear: 1901,
		jobTitle: '',
		groupIds: null,
		organizationIds: null,
		roleIds: null,
		userGroupIds: null,
		sendEmail: false
	};

	var action = new Action('/user/add-user', user);

	action.doAction(callback);
}