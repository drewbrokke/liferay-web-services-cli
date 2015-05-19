#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('group-users [quantityOfUsers]')
		.alias('gu')
		.description('Create a group (site) populated with users.')
		.option('-i, --interactive', 'Interactively add users to a group')
		.action(function(number) {
			if (this.interactive) {
				actions.interactive.addGroupUsers(function(error, results) {
					if (!error) {
						outputUtil.printJSON(results);
					}
				});
			}
			else {
				number = !_.isNaN(Number(number)) ? Number(number) : 1;

				function addGroup() {
					return actions.addGroup(1);
				}

				function addUser() {
					return actions.addUser(number);
				}

				addGroup().then(function(group) {
					group = group[0];

					addUser().then(function(users) {
						var userIds = _.map(users, function(user) {
							return user.userId;
						});

						actions.addGroupUsers(group.groupId, userIds).then(function(result) {
							console.log('%j users added to site %j', users.length, group.nameCurrentValue);
						});
					});
				});
			}
		});

	return program;
}
