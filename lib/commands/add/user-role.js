#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var actions = require('../../actions');
var methodRouters = require('../../utils/methodUtil').getMethodRouters();
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
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
					actions.addUser(1, function(error, results) {
						userInfo = results[0];
						asyncCallback();
					});
				}

				tasks.push(addUser);
			}

			if (!roleInfo) {
				function addRole(asyncCallback) {
					actions.addRole(1, 1, function(error, results) {
						roleInfo = results[0];
						asyncCallback();
					});
				}

				tasks.push(addRole);
			}

			async.series(tasks, function() {
				actions.addUserRole(userInfo.userId, roleInfo.roleId, function(error, results) {
					if (!error) {
						console.log('Successfully added the role \'%j\' to the user \'%j\'.', roleInfo.name, userInfo.screenName);
					}
				});
			});
		});

	return program;
}
