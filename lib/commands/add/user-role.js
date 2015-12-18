#!/usr/bin/env node

var _ = require('lodash');

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

			function getFirstItem(items) {
				var item = items[0];

				if (_.contains(_.keys(item), 'type') && item.type != 1) {
					throw 'You can only assign a regular role to a user with this method.';
				}

				return item;
			}

			function getUser() {
				return userInfo ? actions.getUser(userInfo).then(getFirstItem) : actions.addUser(1).then(getFirstItem);
			}

			function getRole() {
				return roleInfo ? actions.getRole(roleInfo).then(getFirstItem) : actions.addRole(1, 1).then(getFirstItem);
			}

			getRole().then(function(role) {
				return getUser().then(function(user) {
					actions.addUserRole(user.userId, role.roleId).then(function() {
						console.log('Successfully added the role \'%j\' to the user \'%j\'.', role.name, user.screenName);
					});
				});
			})
			.catch(function(e) {
				outputUtil.printError('Incorrect Role Type: ' + e);
			});
		});

	return program;
};