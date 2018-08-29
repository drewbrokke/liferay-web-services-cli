#!/usr/bin/env node

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('organization')
		.alias('o')
		.description('Gets all organizations in the current company.')
		.action(function() {
			actions.getOrganizations()
				.then(function(organizations) {
					outputUtil.printTable(organizations, 'organization');
				});
		});

	return program;
};