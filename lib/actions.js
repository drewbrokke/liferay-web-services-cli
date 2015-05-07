var _ = require('lodash');
var async = require('async');

var utils = require('./utils');

var methods = utils.getMethods();
var methodRouters = utils.getMethodRouters();

var actions = {};

var REQUEST_LIMIT = 10;

actions.addGroupUsers = function(groupId, userIds, callback) {
	if (!groupId) {
		console.error('No group ID provided');
	}

	if (!userIds) {
		console.error('No user IDs provided');
	}

	methods.addGroupUsers(
		groupId,
		userIds,
		function(error, response) {
			if (!error && callback) {
				callback(null, response);
			}
		}
	);
}

actions.addGroup = function(numberOfGroups, callback) {
	var bar = utils.getProgressBar(numberOfGroups);
	var groupNames = [];
	var responseGroups = [];
	var i;

	utils.statusMessage(numberOfGroups, 'group');

	for (i = 0; i < numberOfGroups; i++) {
		groupNames.push(utils.generateGroupName());
	}

	async.eachLimit(
		groupNames,
		REQUEST_LIMIT,
		function(groupName, asyncCallback) {
			methods.addGroup(
				groupName,
				function(error, response) {
					if (!error) {
						bar.tick();
						responseGroups.push(response);
						asyncCallback();
					}
				}
			);
		},
		function(err) {
			if (!err && callback) {
				callback(null, responseGroups);
			}
		}
	);
}

actions.addLayout = function(numberOfLayouts, groupId, parentLayoutId, callback) {
	var bar = utils.getProgressBar(numberOfLayouts);
	var layoutNameBase = utils.generateLayoutName();

	utils.statusMessage(numberOfLayouts, 'layout');

	async.timesSeries(
		numberOfLayouts,
		function(n, asyncCallback) {
			var layoutName = layoutNameBase + ' ' + n;

			methods.addLayout(
				groupId,
				layoutName,
				parentLayoutId,
				function(error, response) {
					if (!error) {
						bar.tick();
						asyncCallback(null, response);
					}
				}
			);
		},
		function(error, results) {
			if (!error && callback) {
				callback(null, results);
			}
		}
	);
}

actions.addOrganization = function(numberOfOrganizations, parentOrganizationId, callback) {
	var bar = utils.getProgressBar(numberOfOrganizations);
	var organizationNames = [];
	var responseOrganizations = [];
	var i;

	utils.statusMessage(numberOfOrganizations, 'organization');

	for (i = 0; i < numberOfOrganizations; i++) {
		organizationNames.push(utils.generateOrganizationName());
	}

	async.eachLimit(
		organizationNames,
		REQUEST_LIMIT,
		function(organizationName, asyncCallback) {
			methods.addOrganization(
				organizationName,
				function(error, response) {
					if (!error) {
						bar.tick();
						responseOrganizations.push(response);
						asyncCallback();
					}
				}
			);
		},
		function(error) {
			if (!error && callback) {
				callback(null, responseOrganizations);
			}
		}
	);
}

actions.addRole = function(numberOfRoles, type, callback) {
	var bar = utils.getProgressBar(numberOfRoles);
	var roleNames = [];
	var responseRoles = [];
	var i;

	for (i = 0; i < numberOfRoles; i++) {
		roleNames.push(utils.generateRoleName(type));
	}

	async.eachLimit(
		roleNames,
		REQUEST_LIMIT,
		function(roleName, asyncCallback) {
			methods.addRole(
				roleName,
				type,
				function(error, response) {
					if (!error) {
						bar.tick();
						responseRoles.push(response);
						asyncCallback();
					}
				}
			);
		},
		function(error) {
			if (!error && callback) {
				callback(null, responseRoles);
			}
		}
	);
}

actions.addUserGroup = function(numberOfUserGroups, callback) {
	var bar = utils.getProgressBar(numberOfUserGroups);
	var userGroupNames = [];
	var responseUserGroups = [];
	var i;

	for (i = 0; i < numberOfUserGroups; i++) {
		userGroupNames.push(utils.generateUserGroupName());
	}

	async.eachLimit(
		userGroupNames,
		REQUEST_LIMIT,
		function(userGroupName, asyncCallback) {
			methods.addUserGroup(
				userGroupName,
				function(error, response) {
					if (!error) {
						bar.tick();
						responseUserGroups.push(response);
						asyncCallback();
					}
				}
			);
		},
		function(error) {
			if (!error && callback) {
				callback(null, responseUserGroups);
			}
		}
	);
}

actions.addUserRole = function(userInfo, roleInfo, callback) {
	if (!userInfo) {
		console.error('No user information provided');
	}

	if (!roleInfo) {
		console.error('No role information provided');
	}

	var getUserAction = methodRouters.getUserRouter(userInfo);
	var getRoleAction = methodRouters.getRoleRouter(roleInfo);

	function getUser(asyncCallback) {
		methods[getUserAction](
			userInfo,
			function(error, response) {
				if (!error) {
					asyncCallback(null, JSON.parse(response));
				}
			}
		);
	}

	function getRole(asyncCallback) {
		methods[getRoleAction](
			roleInfo,
			function(error, response) {
				if (!error) {
					asyncCallback(null, JSON.parse(response));
				}
			}
		);
	}

	async.parallel(
		[getUser, getRole],
		function(error, results) {
			if (!error) {
				var user = results[0];
				var role = results[1];
				var roleIds = [];

				roleIds.push(role.roleId);

				methods.addUserRole(
					user.userId,
					roleIds,
					function(error, response) {
						if (!error && callback) {
							callback(null, results);
						}
					}
				);
			}
			else {
				console.error(error);
			}
		}
	);
}

actions.addUser = function(numberOfUsers, callback) {
	var bar = utils.getProgressBar(numberOfUsers);
	var usersData = [];
	var responseUsers = [];

	utils.statusMessage(numberOfUsers, 'user');

	for (i = 0; i < numberOfUsers; i++) {
		usersData.push(utils.generateUserInfo());
	}

	async.eachLimit(
		usersData,
		REQUEST_LIMIT,
		function(user, asyncCallback) {
			methods.addUser(
				user.firstName,
				user.lastName,
				user.screenName,
				user.emailAddress,
				user.male,
				function(error, response) {
					if (!error) {
						bar.tick();
						responseUsers.push(response);
						asyncCallback();
					}
				}
			);
		},
		function(error) {
			if (!error && callback) {
				callback(null, responseUsers);
			}
		}
	);
}

actions.getRole = function(roleInfo, callback) {
	if (!roleInfo.length) {
		console.error('Please provide role info.');
	}

	async.timesSeries(
		roleInfo.length,
		function(n, asyncCallback) {
			var getRoleAction = methodRouters.getRoleRouter(roleInfo[n]);

			methods[getRoleAction](
				roleInfo[n],
				function(error, response) {
					if (!error) {
						asyncCallback(null, response);
					}
				}
			);
		},
		function(error, results) {
			if (!error) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('Got Role:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				if (callback) {
					callback(null, results);
				}
			}
		}
	);
}

actions.getUser = function(userInfo, callback) {
	if (userInfo.length) {
		// Get Users from provided info
		async.timesSeries(
			userInfo.length,
			function(n, asyncCallback) {
				var getUserAction = methodRouters.getUserRouter(userInfo[n]);

				methods[getUserAction](
					userInfo[n],
					function(error, response) {
						if (!error) {
							asyncCallback(null, response);
						}
					}
				);
			},
			function(error, results) {
				if (!error) {
					for (var i = 0, length = results.length; i < length; i++) {
						console.log('');
						console.log('Got User:');
						utils.printJSON(JSON.parse(results[i]));
						console.log('');
					}

					if (callback) {
						callback(null, results);
					}
				}
			}
		);
	}
	else {
		// Get all users in the company
		methods.getCompanyUsers(
			function(error, response) {
				if (!error) {
					var users = JSON.parse(response);

					console.log('');

					_.forEach(users, function(user) {
						console.log('Got User:');
						user = _.pick(user, ['screenName', 'firstName', 'lastName', 'emailAddress', 'userId']);

						utils.printJSON(user);
						console.log('');
					})
				}
			}
		);
	}
}

actions.interactive = require('./interactiveActions');

module.exports = actions;
