var _ = require('lodash');
var async = require('async');

var utils = require('./utils');

var methods = utils.getMethods();
var methodRouters = utils.getMethodRouters();

var actions = {};

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

	utils.statusMessage(numberOfGroups, 'group');

	async.timesSeries(
		numberOfGroups,
		function(n, asyncCallback) {
			var groupName = utils.generateGroupName();

			methods.addGroup(
				groupName,
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

actions.addLayout = function(numberOfLayouts, groupId, parentLayoutId, callback) {
	var layoutNameBase = utils.generateLayoutName();

	var bar = utils.getProgressBar(numberOfLayouts);

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

	utils.statusMessage(numberOfOrganizations, 'organization');

	async.timesSeries(
		numberOfOrganizations,
		function(n, asyncCallback) {
			var organizationName = utils.generateOrganizationName();

			methods.addOrganization(
				organizationName,
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

actions.addRole = function(numberOfRoles, type, callback) {
	var bar = utils.getProgressBar(numberOfRoles);

	async.timesSeries(
		numberOfRoles,
		function(n, asyncCallback) {
			var name = utils.generateRoleName(type);

			methods.addRole(
				name,
				type,
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

actions.addUserGroup = function(numberOfUserGroups, callback) {
	var bar = utils.getProgressBar(numberOfUserGroups);

	async.timesSeries(
		numberOfUserGroups,
		function(n, asyncCallback) {
			var name = utils.generateUserGroupName();

			methods.addUserGroup(
				name,
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

	utils.statusMessage(numberOfUsers, 'user');

	async.timesSeries(
		numberOfUsers,
		function(n, asyncCallback) {
			var person = utils.generateUserInfo();

			methods.addUser(
				person.firstName,
				person.lastName,
				person.screenName,
				person.emailAddress,
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

module.exports = actions;
