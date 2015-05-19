#!/usr/bin/env node

var async = require('async');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('role <roleInfo>')
		.alias('r')
		.description('Gets one or more roles from the database. Role id or name is required.')
		.action(function(roleInfo) {
			actions.getRole(roleInfo).then(function(role) {
				outputUtil.printJSON(role);
			});
		});

	return program;
}
