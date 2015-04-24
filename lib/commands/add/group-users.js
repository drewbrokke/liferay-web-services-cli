#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var actions = utils.getActions();
var commands = utils.getCommands('add');

function registerCommand(program) {
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
				commands.addGroup(1, function(error, results) {
					groupId = JSON.parse(results[0]).groupId;
					asyncCallback();
				});
			}

			tasks.push(addGroup);

			function addUser(asyncCallback) {
				commands.addUser(number, function(error, results) {
					_.forEach(results, function(user) {
						userIds.push(JSON.parse(user).userId);
					});

					asyncCallback();
				});
			}

			tasks.push(addUser);

			async.series(tasks, function() {
				commands.addGroupUsers(groupId, userIds);
			});
		});

	return program;
}

function addGroupUsers(groupId, userIds, callback) {
	if (!groupId) {
		console.error('No group ID provided');
	}

	if (!userIds) {
		console.error('No user IDs provided');
	}

	actions.addGroupUsers(
		groupId,
		userIds,
		function(error, response) {
			if (!error) {
				console.log('Added users to the site!');
			}
		}
	);
}

module.exports.registerCommand = registerCommand;
module.exports.command = addGroupUsers;
