var randomName = require('node-random-name');
var sillyName = require('sillyname');
var Action = require('../actionClass');

module.exports = function(program, callback) {
	var person = {};

	var tempFullName = program.silly ? sillyName() : randomName();

	person.first = program.firstname || tempFullName.split(' ')[0];
	person.last = program.lastname || tempFullName.split(' ')[1];
	person.fullName = person.first + ' ' + person.last;
	person.email = person.first + person.last + '@liferay.com';

	var user =  {
		companyId: 20152,
		autoPassword: false,
		password1: 'test',
		password2: 'test',
		autoScreenName: false,
		screenName: person.fullName.replace(' ', ''),
		emailAddress: person.email,
		facebookId: 0,
		openId: '',
		locale: null,
		firstName: person.first.replace(' ', ''),
		middleName: '',
		lastName: person.last.replace(' ', ''),
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