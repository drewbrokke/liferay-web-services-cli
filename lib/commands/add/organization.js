#!/usr/bin/env node

var _ = require('lodash');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('organization [quantity]')
		.alias('o')
		.option('-p, --parentOrganizationId <integer>', 'The parent organization ID to add the organization to. Defaults to 0.', Number, 0)
		.description('Adds one or more organizations to the database.')
		.action(function(number) {
			number = !_.isNaN(Number(number)) ? Number(number) : 1;

			actions.addOrganization(number, this.parentOrganizationId).then(function(organizations) {
				for (var i = 0, length = organizations.length; i < length; i++) {
					outputUtil.newObjectCallback(organizations[i], 'organization');
				}

				console.log('Successfully added', + organizations.length + ' new organizations.');
			});
		});

	return program;
}
