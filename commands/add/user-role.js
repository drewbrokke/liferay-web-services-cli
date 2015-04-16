#!/usr/bin/env node

var async = require('async');
var program = require('commander');

var getRoleActionRouter = require('../../method-routers/get-role-router');
var getUserActionRouter = require('../../method-routers/get-user-router');
var utils = require('../../lib/utils');
var addUserAction = require('../../actions/add-user');
var addRoleAction = require('../../actions/add-role');
var addUserRoleAction = require('../../actions/add-user-role');

program
	.option('-u, --userInfo <userInfo>', 'User id to add a role to.')
	.option('-r, --roleInfo <roleInfo>', 'The role id to add to the user.')
	.parse(process.argv);

var userInfo = program.userInfo;
var roleInfo = program.roleInfo;

var userFn;
var roleFn;

function addUserRole() {
	if (userInfo) {
		// Get User
		var getUserAction = getUserActionRouter(userInfo);

		userFn = function(asyncCallback) {
			require(getUserAction)(userInfo, function(error, response) {
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
			addUserAction(
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
		var getRoleAction = getRoleActionRouter(roleInfo);

		roleFn = function(asyncCallback) {
			require(getRoleAction)(roleInfo, function(error, response) {
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
			addRoleAction(
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

			addUserRoleAction(user.userId, roleIds, function(error, response) {
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
