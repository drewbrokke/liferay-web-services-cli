#!/usr/bin/env node

var _ = require('lodash');

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
				actions.interactive.addUser().then(function(user) {
					outputUtil.printJSON(user);
				});
			}
			else {
				number = !_.isNaN(Number(number)) ? Number(number) : 1;

				actions.addUser(number).then(function(users) {
					outputUtil.printTable(users, 'user');
				});
			}
		});

	return program;
};