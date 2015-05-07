#!/usr/bin/env node

var async = require('async');

var utils = require('../../utils');

var outputUtil = require('../../utils/outputUtil');

var actions = require('../../actions');

module.exports = function(program) {
	program
		.command('role <roleInfo...>')
		.alias('r')
		.description('Gets one or more roles from the database. Role id or name is required.')
		.action(function(roleInfo) {
			actions.getRole(roleInfo);
		});

	return program;
}
