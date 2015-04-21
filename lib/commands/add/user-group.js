#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var actions = utils.getActions();

function registerCommand(program) {
	program
		.command('user-group [quantity]')
		.alias('ug')
		.description('Adds one or more user groups to the database.')
		.action(function(number) {
			number = !_.isNaN(Number(number)) ? Number(number) : 1;

			addUserGroup(number);
		});

	return program;
}

function addUserGroup(numberOfUserGroups, callback) {
	var userGroups = [];
	var bar = utils.getProgressBar(numberOfUserGroups);

	async.timesSeries(
		numberOfUserGroups,
		function(n, asyncCallback) {
			var name = utils.generateUserGroupName();

			actions.addUserGroup(
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
			if (!error) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('New User Group:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new user groups.');

				if (callback) {
					callback(null, results);
				}
			}
		}
	);

	return userGroups;
}

module.exports.registerCommand = registerCommand;
module.exports.command = addUserGroup;
