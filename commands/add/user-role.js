#!/usr/bin/env node

var async = require('async');

var utils = require('../../lib/utils');

var actions = utils.getActions();
var methodRouters = utils.getMethodRouters();

var userFn;
var roleFn;

function addUserRole(userInfo, roleInfo) {
	if (userInfo) {
		// Get User
		var getUserAction = methodRouters.getUserRouter(userInfo);

		userFn = function(asyncCallback) {
			actions[getUserAction](userInfo, function(error, response) {
				if (!error) {
					asyncCallback(null, JSON.parse(response));
				}
			});
		}
	}
	else {
		// Add User
		var person = utils.generateUserInfo();

		userFn = function(asyncCallback) {
			actions.addUser(
				person.firstName,
				person.lastName,
				person.screenName,
				person.emailAddress,
				function(error, response) {
					if (!error) {
						var user = JSON.parse(response);

						console.log('');
						console.log('Added User:');
						utils.printJSON(user);
						console.log('');

						asyncCallback(null, user);
					}
				}
			);
		}
	}

	if (roleInfo) {
		// Get Role
		var getRoleAction = methodRouters.getRoleRouter(roleInfo);

		roleFn = function(asyncCallback) {
			actions[getRoleAction](roleInfo, function(error, response) {
				if (!error) {
					asyncCallback(null, JSON.parse(response));
				}
			});
		}
	}
	else {
		// Add Role
		var type = 1;
		var name = utils.generateRoleName(type);

		roleFn = function(asyncCallback) {
			actions.addRole(
				name,
				type,
				function(error, response) {
					if (!error) {
						var role = JSON.parse(response);

						console.log('');
						console.log('Added Role:');
						utils.printJSON(role);
						console.log('');

						asyncCallback(null, role);
					}
				}
			);
		}
	}

	async.parallel([userFn, roleFn], function(error, results) {
		if (!error) {
			var user = results[0];
			var role = results[1];
			var roleIds = [];

			roleIds.push(role.roleId);

			actions.addUserRole(user.userId, roleIds, function(error, response) {
				if (!error) {
					console.log('Assigned role %j to user %j', role.name, user.firstName + ' ' + user.lastName);
				}
			});
		}
		else {
			console.error(error);
		}
	});
}

module.exports = addUserRole;
