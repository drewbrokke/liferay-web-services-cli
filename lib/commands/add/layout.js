#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('layout [quantity]')
		.alias('l')
		.option('-i, --interactive', 'Interactively add a layout')
		.option('-g, --groupId <integer>', 'The groupId to add the layouts (pages) to. Defaults to the ID of the guest group (site).', Number, 20182)
		.option('-p, --parentLayoutId <integer>', 'The parent layout (page) ID to add the layouts to. Defaults to 0.', Number, 0)
		.description('Adds one or more layouts (pages) to the database.')
		.action(function(number) {
			if (this.interactive) {
				actions.interactive.addLayout(function(error, results) {
					if (!error) {
						outputUtil.newObjectCallback(results, 'layout');
					}
				});
			}
			else {
				number = !_.isNaN(Number(number)) ? Number(number) : 1;

				actions.addLayout(number, this.groupId, this.parentLayoutId).then(function(layouts) {
					for (var i = 0, length = layouts.length; i < length; i++) {
						outputUtil.newObjectCallback(layouts[i], 'layout');
					}

					console.log('Successfully added', + layouts.length + ' new layouts.');
				});
			}

		});

	return program;
}
