#!/usr/bin/env node

var _ = require('lodash');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('group')
		.alias('g')
		.description('Gets all groups in the current company.')
		.action(function() {
			actions.getGroups(function(error, response) {
				_.forEach(response, function(group) {
					console.log('Group: ' + group.groupKey);
					outputUtil.printJSON(group);
					console.log('');
				})
			});
		});

	return program;
}
