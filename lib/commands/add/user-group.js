#!/usr/bin/env node

var _ = require('lodash');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('user-group [quantity]')
		.alias('ug')
		.description('Adds one or more user groups to the database.')
		.action(function(number) {
			number = !_.isNaN(Number(number)) ? Number(number) : 1;

			actions.addUserGroup(number).then(function(userGroups) {
				outputUtil.printTable(userGroups, 'userGroup');

				console.log('Successfully added', + userGroups.length + ' new user groups.');
			});
		});

	return program;
};