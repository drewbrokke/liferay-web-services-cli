var _ = require('lodash');
var async = require('async');

var Promise = require('bluebird');
var inquirer = require('inquirer');

var collectionUtil = require('./utils/collectionUtil');
var methods = require('./utils/methodUtil').getMethods();

var COMPANY_ID = require('./utils/configUtil').getCurrentCompanyId();
var REQUEST_LIMIT = 10;

function prompt(questions) {
	return new Promise(function(resolve, reject) {
		inquirer.prompt(questions, function(answers) {
			resolve(answers);
		});
	});
}

module.exports = {
	addUser: function() {
		var questions = [
			{ name: 'firstName', message: 'First name?' },
			{ name: 'lastName', message: 'Last name?' },
			{ name: 'screenName', message: 'Screen name?' },
			{ name: 'emailAddress', message: 'Email address?' },
			{ name: 'male', message: 'Male?', type: 'confirm' }
		];

		return prompt(questions).then(function(answers) {
			return methods.addUser(
				answers.firstName,
				answers.lastName,
				answers.screenName,
				answers.emailAddress,
				answers.male,
				COMPANY_ID
			);
		});
	},

	addGroup:function() {
		var questions = [
			{ name: 'groupName', message: 'Group name?' }
		];

		return prompt(questions).then(function(answers) {
			return methods.addGroup(answers.groupName);
		});
	},

	addGroupUsers: function() {
		var groupId;

		function getGroupId() {
			return methods.getGroups(COMPANY_ID).then(function(groups) {
				groups = collectionUtil.getMap(groups, 'nameCurrentValue', 'groupId');

				return prompt({ name: 'group', message: 'Which group?', type: 'list', choices: _.keys(groups) })
					.then(function(answers) {
						groupId = groups[answers.group];

						return groupId;
					});
			});
		}

		function getGroupUsers(groupId) {
			return methods.getGroupUsers(groupId).then(function(users) {
				return _.map(users, function(user) {
					return user.userId;
				});
			})
		}

		function getAvailableUsers(currentGroupUsers) {
			return methods.getCompanyUsers(COMPANY_ID).then(function(users) {
				var availableUsers = collectionUtil.getMap(users, 'screenName', 'userId');

				// Excludes users that are already part of the site
				availableUsers = _.omit(availableUsers, function(user) {
					return _.contains(currentGroupUsers, user);
				});

				return availableUsers;
			});
		}

		function askWhichUsers(availableUsers) {
			return prompt({ name: 'users', message: 'Which users?', type: 'checkbox', choices: _.keys(availableUsers) }).then(function(answers) {
				var userIds = _.map(answers.users, function(user) {
					return availableUsers[user];
				});

				return methods.addGroupUsers(groupId, userIds).then(function(){
					return answers.users;
				});
			});
		}

		return getGroupId()
			.then(getGroupUsers)
			.then(getAvailableUsers)
			.then(askWhichUsers);
	},

	addLayout: function() {
		var groupId;
		var layoutName;

		function askForLayoutInfo(groups) {
			var groupNames = _.map(groups, function(group) {
				return group.nameCurrentValue;
			});

			var questions = [
				{ name: 'name', message: 'Layout name?' },
				{ name: 'groupName', message: 'Group/site?', type: 'list', choices: groupNames }
			];

			return prompt(questions).then(function(answers) {
				layoutName = answers.name;

				groupId = _.find(groups, function(group) {
					return answers.groupName === group.nameCurrentValue;
				}).groupId;

				return methods.getLayouts(groupId);
			});
		}

		function askForParentLayout(parentLayouts) {
			var parentLayoutNames = _.map(parentLayouts, function(parentLayout) {
				return parentLayout.nameCurrentValue;
			});

			if (parentLayoutNames.length) {
				var questions = [
					{ name: 'parentLayoutName', message: 'Parent Layout?', type: 'list', choices: parentLayoutNames }
				];

				return prompt(questions).then(function(answers) {
					if (answers.parentLayoutName != 'No Parent') {
						parentLayoutId = _.find(parentLayouts, function(parentLayout) {
							return answers.parentLayoutName === parentLayout.nameCurrentValue;
						}).layoutId;
					};

					return parentLayoutId;
				});
			}
			else {
				return 0;
			}
		}

		function doAddLayout(parentLayoutId) {
			return methods.addLayout(groupId, layoutName, parentLayoutId);
		}

		return methods.getGroups(COMPANY_ID)
			.then(askForLayoutInfo)
			.then(askForParentLayout)
			.then(doAddLayout);
	},

	addRole: function(callback) {
		var typeMap = {
			regular: 1,
			site: 2,
			organization: 3
		};

		var questions = [
			{ name: 'roleName', message: 'Role name?' },
			{ name: 'type', message: 'Role type?', type: 'list', choices: _.keys(typeMap), default: 'regular' }
		];

		return prompt(questions).then(function(answers) {
			return methods.addRole(answers.roleName, typeMap[answers.type]);
		});
	},

	deleteUser: function(callback) {
		var users;

		function getUsersList() {
			return methods.getCompanyUsers(COMPANY_ID).then(function(results) {
				users = collectionUtil.getMap(results, 'screenName', 'userId');

				// Omits the default and test users
				users = _.omit(users, function(user, index) {
					return index === '20157' || index === 'test';
				});

				return users;
			});
		}

		function askForUsers(currentUsers) {
			var questions = [
				{ name: 'users', message: 'Delete which users?', type: 'checkbox', choices: _.keys(currentUsers) }
			];

			return prompt(questions).then(function(answers) {
				return answers.users;
			})
		}

		function doDeleteUser(markedUsers) {
			return Promise.map(markedUsers, function(user) {
				return methods.deleteUser(users[user]);
			}, { concurrency: REQUEST_LIMIT })
			.then(function() {
				return markedUsers;
			});
		}

		return getUsersList()
			.then(askForUsers)
			.then(doDeleteUser);
	}
};
