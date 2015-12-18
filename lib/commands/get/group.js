#!/usr/bin/env node

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('group')
		.alias('g')
		.description('Gets all groups in the current company.')
		.action(function() {
			actions.getGroups()
				.then(function(groups) {
					outputUtil.printTable(groups, 'group');
				});
		});

	return program;
};