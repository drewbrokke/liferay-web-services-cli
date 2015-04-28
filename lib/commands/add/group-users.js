#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var actions = utils.getActions();

module.exports = function(program) {
	program
		.command('group-users [quantityOfUsers]')
		.alias('gu')
		.description('Create a group (site) populated with users.')
		.action(function(number) {
			number = !_.isNaN(Number(number)) ? Number(number) : 1;

			var groupId;
			var tasks = [];
			var userIds = [];

			function addGroup(asyncCallback) {
				actions.addGroup(1, function(error, results) {
					var group = JSON.parse(results[0]);

					console.log('');
					utils.printJSON(group);
					console.log('');

					groupId = group.groupId;
					asyncCallback();
				});
			}

			tasks.push(addGroup);

			function addUser(asyncCallback) {
				actions.addUser(number, function(error, results) {
					_.forEach(results, function(user) {
						userIds.push(JSON.parse(user).userId);
					});

					asyncCallback();
				});
			}

			tasks.push(addUser);

			async.series(tasks, function() {
				actions.addGroupUsers(groupId, userIds, function(error, response) {
					if (!error) {
						console.log('Users added to site!');
					}
				});
			});
		});

	return program;
}
