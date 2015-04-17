#!/usr/bin/env node

var async = require('async');

var utils = require('../../lib/utils');

var actions = utils.getActions();
var methodRouters = utils.getMethodRouters();

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
		actions[getUserAction](userInfo, function(error, response) {
			if (!error) {
				asyncCallback(null, JSON.parse(response));
			}
		});
	}

	function getRole(asyncCallback) {
		actions[getRoleAction](roleInfo, function(error, response) {
			if (!error) {
				asyncCallback(null, JSON.parse(response));
			}
		});
	}

	async.parallel(
		[getUser, getRole],
		function(error, results) {
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

				if (callback) {
					callback(null, results);
				}
			}
			else {
				console.error(error);
			}
		}
	);
}

module.exports = addUserRole;
