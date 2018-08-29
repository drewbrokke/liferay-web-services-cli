#!/usr/bin/env node

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('organization')
		.alias('o')
		.description('Gets all organizations in the current company.')
		.option('-p, --parentOrganizationId <integer>', 'Filter results by this parent organization ID.', Number, -1)
		.action(function() {
			actions.getOrganizations(this.parentOrganizationId)
				.then(function(organizations) {
					outputUtil.printTable(organizations, 'organization');
				});
		});

	return program;
};