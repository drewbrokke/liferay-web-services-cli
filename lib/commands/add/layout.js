#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var actions = utils.getActions();

module.exports = function(program) {
	program
		.command('layout [quantity]')
		.alias('l')
		.option('-g, --groupId <integer>', 'The groupId to add the layouts (pages) to. Defaults to the ID of the guest group (site).', Number, 20181)
		.option('-p, --parentLayoutId <integer>', 'The parent layout (page) ID to add the layouts to. Defaults to 0.', Number, 0)
		.description('Adds one or more layouts (pages) to the database.')
		.action(function(number) {
			number = !_.isNaN(Number(number)) ? Number(number) : 1;
			actions.addLayout(number, this.groupId, this.parentLayoutId, function(error, results) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('New Layout:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new groups.');
			});
		});

	return program;
}
