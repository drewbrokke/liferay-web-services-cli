#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('user-group [quantity]')
		.alias('ug')
		.description('Adds one or more user groups to the database.')
		.action(function(number) {
			number = !_.isNaN(Number(number)) ? Number(number) : 1;

			actions.addUserGroup(number, function(error, results) {
				for (var i = 0, length = results.length; i < length; i++) {
					outputUtil.newObjectCallback(JSON.parse(results[i]), 'user group');
				}

				console.log('Successfully added', + results.length + ' new user groups.');
			});
		});

	return program;
}
