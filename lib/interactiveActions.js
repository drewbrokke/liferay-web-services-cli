var _ = require('lodash');
var async = require('async');
var inquirer = require('inquirer');

var collectionUtil = require('./utils/collectionUtil');
var methods = require('./utils/methodUtil').getMethods();

var COMPANY_ID = require('./utils/configUtil').getCurrentCompanyId();
var REQUEST_LIMIT = 10;

module.exports = {
	addUser: function(callback) {
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

	addGroup:function(callback) {
		var questions = [
			{ name: 'groupName', message: 'Group name?' }
		];

		inquirer.prompt(questions, function(answers) {
			methods.addGroup(
				answers.groupName,
				function(error, results) {
					if (!error) {
						callback(null, results);
					}
				}
			);
		});
	},

	addGroupUsers: function(callback) {
		var currentGroupUsers;
		var groups;
		var groupId;
		var users;
		var userScreenNames;

		function getGroups(asyncCallback) {
			methods.getGroups(
				COMPANY_ID,
				function(error, results) {
					if (!error) {
						groups = collectionUtil.getMap(results, 'nameCurrentValue', 'groupId');

						inquirer.prompt(
							{ name: 'group', message: 'Which group?', type: 'list', choices: _.keys(groups) },
							function(answers) {
								groupId = groups[answers.group];

								asyncCallback();
							}
						);
					}
				}
			);
		}

		function getGroupUsers(asyncCallback) {
			methods.getGroupUsers(
				groupId,
				function(error, results) {
					// Gets the users that are currently site members
					currentGroupUsers = _.map(results, function(user) {
						return user.userId;
					});

					asyncCallback();
				}
			);
		}

		function getUsers(asyncCallback) {
			methods.getCompanyUsers(
				COMPANY_ID,
				function(error, results) {
					if (!error) {
						// Gets all users
						users = collectionUtil.getMap(results, 'screenName', 'userId');

						// Excludes users that are already part of the site
						users = _.omit(users, function(user) {
							return _.contains(currentGroupUsers, user);
						});

						asyncCallback();
					}
				}
			);
		}

		async.series(
			[getGroups, getGroupUsers, getUsers],
			function() {
				inquirer.prompt(
					{ name: 'users', message: 'Which users?', type: 'checkbox', choices: _.keys(users) },
					function(answers) {
						var userIds = _.map(answers.users, function(user) {
							return users[user];
						});

						methods.addGroupUsers(
							groupId,
							userIds,
							function(error, results) {
								if (!error) {
									callback(null, results);
								}
							}
						);
					}
				);
			}
		);
	},

	addLayout: function(callback) {
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


		inquirer.prompt(questions, function(answers) {
			methods.addRole(
				answers.roleName,
				typeMap[answers.type],
				callback
			);
		});
	},

	deleteUser: function(callback) {
		var users;

		function getUsersList() {
			methods.getCompanyUsers(COMPANY_ID, function(error, results) {
				if (!error) {
					users = collectionUtil.getMap(results, 'screenName', 'userId');

					// Omits the default and test users
					users = _.omit(users, function(user, index) {
						return index === '20157' || index === 'test';
					});

					askForUsers(users);
				}
			});
		}

		function askForUsers(currentUsers) {
			var questions = [
				{ name: 'users', message: 'Delete which users?', type: 'checkbox', choices: _.keys(currentUsers) }
			];

			inquirer.prompt(questions, function(answers) {
				async.eachLimit(answers.users, REQUEST_LIMIT, function(user, asyncCallback) {
					callDeleteUser(user, asyncCallback);
				});
			})
		}

		function callDeleteUser(user, callback) {
			methods.deleteUser(users[user], function(error, response) {
				if (!error) {
					console.log('Deleted user', user);
					callback(null, response);
				}
			});
		}

		getUsersList();
	}
};
