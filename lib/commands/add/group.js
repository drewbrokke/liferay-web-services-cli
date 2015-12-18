#!/usr/bin/env node

var _ = require('lodash');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('group [quantity]')
		.alias('g')
		.description('Adds one or more groups (sites) to the database.')
		.option('-i, --interactive', 'Interactively add a group')
		.action(function(number) {
			if (this.interactive) {
				actions.interactive.addGroup().then(function(group) {
					outputUtil.printJSON(group);
				});
			}
			else {
				number = !_.isNaN(Number(number)) ? Number(number) : 1;

				actions.addGroup(number).then(function(groups) {
					outputUtil.printTable(groups, 'group');

					console.log('Successfully added', + groups.length + ' new groups.');
				});
			}
		});

	return program;
};