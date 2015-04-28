#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var commands = utils.getCommands('add');

var methods = utils.getMethods();
var methodRouters = utils.getMethodRouters();

function registerCommand(program) {
	program
		.command('user-role')
		.alias('ur')
		.description('Assign a role to a user. If called with no arguments, it will create a new role and user.')
		.option('-u, --userInfo <userInfo>', 'User id to add a role to.')
		.option('-r, --roleInfo <roleInfo>', 'The role id to add to the user.')
		.action(function() {
			var userInfo = this.userInfo;
			var roleInfo = this.roleInfo;

			var tasks = [];

			if (!userInfo) {
				function addUser(asyncCallback) {
					commands.addUser(1, function(error, results) {
						userInfo = JSON.parse(results[0]);
						asyncCallback();
					});
				}

				tasks.push(addUser);
			}

			if (!roleInfo) {
				function addRole(asyncCallback) {
					commands.addRole(1, 1, function(error, results) {
						roleInfo = JSON.parse(results[0]);
						asyncCallback();
					});
				}

				tasks.push(addRole);
			}

			async.series(tasks, function() {
				addUserRole(userInfo.userId, roleInfo.roleId, function(error, results) {
					if (!error) {
						console.log('Successfully added the role \'%j\' to the user \'%j\'.', roleInfo.name, userInfo.screenName);
					}
				});
			});
		});

	return program;
}

function addUserRole(userInfo, roleInfo, callback) {
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

module.exports.registerCommand = registerCommand;
module.exports.command = addUserRole;
