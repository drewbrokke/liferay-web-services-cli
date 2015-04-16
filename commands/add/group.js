#!/usr/bin/env node

var async = require('async');

var actions = require('../../lib/actions');
var utils = require('../../lib/utils');

function addGroup(numberOfGroups) {
	var bar = utils.getProgressBar(numberOfGroups);
	var groups = [];

	utils.statusMessage(numberOfGroups, 'group');

	async.timesSeries(
		numberOfGroups,
		function(n, callback) {
			var groupName = utils.generateGroupName();

			actions.addGroup(groupName, function(error, response) {
				if (!error) {
					bar.tick();
					callback(null, response);
				}
			});
		},
		function(error, results) {
			if (!error) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('New Group:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new groups.');
			}
		}
	);

	return groups;
}

module.exports = addGroup;