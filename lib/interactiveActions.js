var inquirer = require('inquirer');

var utils = require('./utils');

var methods = utils.getMethods();

var actions = {};

actions.interactiveAddUser = function(callback) {
	var questions = [
		{
			name: 'firstName',
			message: 'First name?'
		},
		{
			name: 'lastName',
			message: 'Last name?'
		},
		{
			name: 'screenName',
			message: 'Screen name?'
		},
		{
			name: 'emailAddress',
			message: 'Email address?'
		},
		{
			name: 'male',
			message: 'Male?',
			type: 'confirm'
		}
	];

	inquirer.prompt(questions, function(answers) {
		methods.addUser(
			answers.firstName,
			answers.lastName,
			answers.screenName,
			answers.emailAddress,
			answers.male,
			callback
		);
	});
}

module.exports = actions;
