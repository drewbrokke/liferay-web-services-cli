#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var actions = utils.getActions();

module.exports = function(program) {
	program
		.command('group [quantity]')
		.alias('g')
		.description('Adds one or more groups (sites) to the database.')
		.action(function(number) {
			number = !_.isNaN(Number(number)) ? Number(number) : 1;

			actions.addGroup(number, function(error, results) {
				if (!error) {
					for (var i = 0, length = results.length; i < length; i++) {
						console.log('');
						console.log('New Group:');
						utils.printJSON(JSON.parse(results[i]));
						console.log('');
					}

					console.log('Successfully added', + results.length + ' new groups.');
				}
			});
		});

	return program;
}
