#!/usr/bin/env node

var _ = require('lodash');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('role [quantity]')
		.alias('r')
		.description('Adds one or more roles to the database.')
		.option('-i, --interactive', 'Add a role interactively.')
		.option('-t, --type <type>', 'Type of role to add. Accepts "site" or "organization". Defaults to "regular".')
		.action(function(number) {
			if (this.interactive) {
				actions.interactive.addRole().then(function(role) {
					outputUtil.newObjectCallback(role, 'role')
				});
			}
			else {
				var type = this.type;

				number = !_.isNaN(Number(number)) ? Number(number) : 1;

				if (type === 'site') {
					type = 2;
				}
				else if (type === 'organization' || type === 'org') {
					type = 3;
				}
				else {
					type = 1;
				}

				actions.addRole(number, type).then(function(roles) {
					outputUtil.printTable(roles, 'role');

					console.log('Successfully added', + roles.length + ' new roles.');
				});
			}
		});

	return program;
}
