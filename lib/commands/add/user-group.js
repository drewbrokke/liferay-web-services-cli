#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var actions = utils.getActions();

module.exports = function(program) {
	program
		.command('user-group [quantity]')
		.alias('ug')
		.description('Adds one or more user groups to the database.')
		.action(function(number) {
			number = !_.isNaN(Number(number)) ? Number(number) : 1;

			actions.addUserGroup(number, function(error, results) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('New User Group:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new user groups.');
			});
		});

	return program;
}
