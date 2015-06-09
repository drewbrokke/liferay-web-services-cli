#!/usr/bin/env node

var _ = require('lodash');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('user')
		.alias('u')
		.description('Deletes one or more users from the database.  Interactive by default.')
		.action(function() {
			actions.interactive.deleteUser().then(function(results) {
				outputUtil.printJSON(results);
			});
		});

	return program;
}
