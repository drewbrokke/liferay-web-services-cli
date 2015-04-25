#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var actions = utils.getActions();

function registerCommand(program) {
	program
		.command('role [quantity]')
		.alias('r')
		.description('Adds one or more roles to the database.')
		.option('-t, --type <type>', 'Type of role to add. Accepts "site" or "organization". Defaults to "regular".')
		.action(function(number) {
			var type = this.type;

			number = !_.isNaN(Number(number)) ? Number(number) : 1;

			if (type === 'site') {
				type = 2;
			}
			else if (type === 'organization' || type === 'org') {
				type = 3;
			}
			else {
				type = 1;
			}

			addRole(number, type, function(err, results) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('New Role:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new roles.');
			});
		});

	return program;
}

function addRole(numberOfRoles, type, callback) {
	var roles = [];
	var bar = utils.getProgressBar(numberOfRoles);

	async.timesSeries(
		numberOfRoles,
		function(n, asyncCallback) {
			var name = utils.generateRoleName(type);

			actions.addRole(
				name,
				type,
				function(error, response) {
					if (!error) {
						bar.tick();
						asyncCallback(null, response);
					}
				}
			);
		},
		function(error, results) {
			if (!error && callback) {
				callback(null, results);
			}
		}
	);

	return roles;
}

module.exports.registerCommand = registerCommand;
module.exports.command = addRole;
