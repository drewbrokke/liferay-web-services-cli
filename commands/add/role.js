#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');
var program = require('commander');
var utils = require('../../lib/utils');
var addRoleAction = require('../../actions/add-role.js');

program
	.option('-t, --type <type>', 'The type of role. Uses integer value. Defaults to 1.', Number, 1)
	.parse(process.argv);

var args = program.args;

function hasArg(arg) {
	return _.includes(args, arg);
}

var type = program.type;

if (hasArg('site')) {
	type = 2;
}
if (hasArg('organization') || hasArg('org')) {
	type = 3;
}

function addRole(numberOfRoles) {
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