#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('user')
		.alias('u')
		.description('Deletes one or more users from the database.  Interactive by default.')
		.action(function(number) {
			actions.interactive.deleteUser(function(error, results) {
				if (!error) {
					outputUtil.printJSON(results);
				}
			});
		});

	return program;
}
