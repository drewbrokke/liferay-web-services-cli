var Method = require('../Method');

module.exports = function(firstName, lastName, screenName, emailAddress, male, companyId) {
	var user =  {
		companyId: companyId,
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
		male: male,
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

	var method = new Method('/user/add-user', user);

	return method.invoke();
};