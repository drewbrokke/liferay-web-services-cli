#!/usr/bin/env node


var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('role [roleInfo]')
		.alias('r')
		.description('Gets one or more roles from the database. Role id or name is required.')
		.action(function(roleInfo) {
			if (roleInfo) {
				actions.getRole(roleInfo).then(function(role) {
					outputUtil.printTable(role, 'role');
				});
			}
			else {
				console.log('else');
				actions.getRoles().then(function(roles) {
					outputUtil.printTable(roles, 'role');
				});
			}
		});

	return program;
};