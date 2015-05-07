#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var actions = utils.getActions();

module.exports = function(program) {
	program
		.command('user [quantity]')
		.alias('u')
		.description('Adds one or more users to the database.')
		.option('-i, --interactive', 'Interactively add a user with specific data.')
		.action(function(number) {
			if (this.interactive) {
				actions.interactive.interactiveAddUser(function(error, results) {
					console.log('');
					console.log('New User:');
					utils.printJSON(JSON.parse(results));
					console.log('');
				});
			}
			else {
				number = !_.isNaN(Number(number)) ? Number(number) : 1;

				actions.addUser(number, function(error, results) {
					if (!error) {
						for (var i = 0, length = results.length; i < length; i++) {
							console.log('');
							console.log('New User:');
							utils.printJSON(JSON.parse(results[i]));
							console.log('');
						}

						console.log('Successfully added', + results.length + ' new users.');
					}
				});
			}
		});

	return program;
}
