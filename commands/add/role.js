#!/usr/bin/env node

var async = require('async');
var utils = require('../../lib/utils');
var addRoleAction = require('../../actions/add-role.js');

function addRole(numberOfRoles, type) {
	var roles = [];
	var bar = utils.getProgressBar(numberOfRoles);

	async.timesSeries(
		numberOfRoles,
		function(n, callback) {
			var name = utils.generateRoleName(type);

			addRoleAction(name, type, function(error, response) {
				if (!error) {
					bar.tick();
					callback(null, response);
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
			}
		}
	);

	return roles;
}

module.exports = addRole;