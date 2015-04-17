#!/usr/bin/env node

var async = require('async');

var utils = require('../../lib/utils');

var actions = utils.getActions();

function addRole(numberOfRoles, type, callback) {
	var roles = [];
	var bar = utils.getProgressBar(numberOfRoles);

	async.timesSeries(
		numberOfRoles,
		function(n, asyncCallback) {
			var name = utils.generateRoleName(type);

			actions.addRole(name, type, function(error, response) {
				if (!error) {
					bar.tick();
					asyncCallback(null, response);
				}
			});
		},
		function(error, results) {
			if (!error) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('New Role:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new roles.');

				if (callback) {
					callback(null, results);
				}
			}
		}
	);

	return roles;
}

module.exports = addRole;