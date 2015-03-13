var randomName = require('node-random-name');
var sillyName = require('sillyname');
var request = require('request');

module.exports = function(program) {
	var number = !isNaN(program.number) ? program.number : 1;

	var base = 'http://test@liferay.com:test@localhost:8080/api/jsonws';
	var action = '/user/add-user';
	var url = base + action;

	function addUser(index) {
		index = (number > 0 && program.firstname && program.lastname) ? index + 1 : '';
		var person = {};

		var tempFullName = program.silly ? sillyName() : randomName();

		person.first = program.firstname || tempFullName.split(' ')[0];
		person.last = program.lastname || tempFullName.split(' ')[1];
		person.fullName = person.first + ' ' + person.last;
		person.email = person.first + person.last + index + '@liferay.com';

		var user = {
			companyId: 20152,
			autoPassword: false,
			password1: 'test',
			password2: 'test',
			autoScreenName: false,
			screenName: person.fullName.replace(' ', '') + index,
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

		request.post(
			{
				url: url,
				form: user
			},
			callback
		);
	}

	function callback(error, response, body) {
		if (!error && (response.statusCode == 200)) {
			var user = JSON.parse(body);

			console.log('');
			console.log('USER ADDED');
			console.log('Name: ', user.firstName + ' ' + user.lastName + '');
			console.log('Password: test');
			console.log('UserId: ', user.userId);
		}
		else {
			console.log('');
			console.log('Something went wrong...');
			console.log('STATUS CODE: ', response.statusCode);
			console.log('ERROR: ', error);
		}
	}

	for (var i = 0; i < number; i++) {
		addUser(i);
	}
}