var inquirer = require('inquirer');

var methods = require('./utils/methodUtil').getMethods();
var COMPANY_ID = require('./utils/configUtil').getCurrentCompanyId();

module.exports = {
	interactiveAddUser: function(callback) {
		var questions = [
			{ name: 'firstName', message: 'First name?' },
			{ name: 'lastName', message: 'Last name?' },
			{ name: 'screenName', message: 'Screen name?' },
			{ name: 'emailAddress', message: 'Email address?' },
			{ name: 'male', message: 'Male?', type: 'confirm' }
		];

		inquirer.prompt(questions, function(answers) {
			methods.addUser(
				answers.firstName,
				answers.lastName,
				answers.screenName,
				answers.emailAddress,
				answers.male,
				COMPANY_ID,
				callback
			);
		});
	},

	interactiveAddRole: function(callback) {
		var questions = [
			{ name: 'roleName', message: 'Role name?' },
			{
				name: 'type',
				message: 'Role type?',
				type: 'list',
				choices: [ 'regular', 'site', 'organization' ],
				default: 'regular'
			}
		];

		var typeMap = {
			regular: 1,
			site: 2,
			organization: 3
		};

		inquirer.prompt(questions, function(answers) {
			methods.addRole(
				answers.roleName,
				typeMap[answers.type],
				callback
			);
		});
	}
};
