#!/usr/bin/env node

var async = require('async');

var utils = require('../../lib/utils');

var actions = utils.getActions();

function addLayout(numberOfLayouts, groupId, parentLayoutId, callback) {
	var layouts = [];
	var layoutNameBase = utils.generateLayoutName();

	var bar = utils.getProgressBar(numberOfLayouts);

	utils.statusMessage(numberOfLayouts, 'layout');

	async.timesSeries(
		numberOfLayouts,
		function(n, asyncCallback) {
			var layoutName = layoutNameBase + ' ' + n;

			actions.addLayout(groupId, layoutName, parentLayoutId, function(error, response) {
				if (!error) {
					bar.tick();
					asyncCallback(null, response);
				}
			});
		},
		function(error, results) {
			if (!error) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('New Layout:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new groups.');

				if (callback) {
					callback(null, results);
				}
			}
		}
	);

	return layouts;
}

module.exports = addLayout;