#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('user [quantity]')
		.alias('u')
		.description('Adds one or more users to the database.')
		.option('-i, --interactive', 'Interactively add a user with specific data.')
		.action(function(number) {
			if (this.interactive) {
				actions.interactive.addUser(function(error, results) {
					if (!error) {
						outputUtil.newObjectCallback(results, 'user');
					}
				});
			}
			else {
				number = !_.isNaN(Number(number)) ? Number(number) : 1;

				actions.addUser(number, function(error, results) {
					if (!error) {
						for (var i = 0, length = results.length; i < length; i++) {
							outputUtil.newObjectCallback(results[i], 'user');
						}

						console.log('Successfully added', + results.length + ' new users.');
					}
				});
			}
		});

	return program;
}
