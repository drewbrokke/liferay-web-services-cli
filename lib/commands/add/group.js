#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

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
						outputUtil.newObjectCallback(results[i], 'group');
					}

					console.log('Successfully added', + results.length + ' new groups.');
				}
			});
		});

	return program;
}
