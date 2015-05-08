var _ = require('lodash');
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

	interactiveAddLayout: function(callback) {
		var groups;
		var groupId;
		var groupNames;
		var layoutName;
		var parentLayouts;
		var parentLayoutNames;
		var parentLayoutId = 0;

		function ask(groupNames) {
			var questions = [
				{ name: 'name', message: 'Layout name?' },
				{ name: 'groupName', message: 'Group/site?', type: 'list', choices: groupNames }
			];

			inquirer.prompt(questions, function(answers) {
				layoutName = answers.name;

				groupId = _.find(groups, function(group) {
					return answers.groupName === group.nameCurrentValue;
				}).groupId;

				methods.getLayouts(groupId, function(error, response) {
					parentLayouts = response;

					parentLayoutNames = _.map(parentLayouts, function(parentLayout) {
						return parentLayout.nameCurrentValue;
					});

					if (parentLayoutNames.length) {
						parentLayoutNames.push('No Parent');

						askForParentLayout(parentLayoutNames);
					}
					else {
						invokeMethod(groupId, layoutName, parentLayoutId);
					}
				});
			});
		}

		function askForParentLayout(parentLayoutNames) {
			var questions = [
				{ name: 'parentLayoutName', message: 'Parent Layout?', type: 'list', choices: parentLayoutNames }
			];

			inquirer.prompt(questions, function(answers) {
				if (answers.parentLayoutName != 'No Parent') {
					parentLayoutId = _.find(parentLayouts, function(parentLayout) {
						return answers.parentLayoutName === parentLayout.nameCurrentValue;
					}).layoutId;
				};

				invokeMethod(groupId, layoutName, parentLayoutId);
			});
		}

		function invokeMethod(groupId, name, parentLayoutId) {
			methods.addLayout(
				groupId,
				name,
				parentLayoutId,
				function(error, response) {
					if (!error) {
						callback(null, response);
					}
				}
			);
		}

		methods.getGroups(COMPANY_ID, function(error, response) {
			groups = response;

			groupNames = _.map(groups, function(group) {
				return group.nameCurrentValue;
			});

			ask(groupNames);
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
