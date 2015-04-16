#!/usr/bin/env node

var async = require('async');
var program = require('commander');
var utils = require('../../lib/utils');

program
	.option('-g, --groupId <integer>', 'The groupId to add the pages to. Defaults to the ID of the guest site.', Number, 20181)
	.option('-p, --parentLayoutId <integer>', 'The parent page ID to add the pages to. Defaults to 0.', Number, 0)
	.parse(process.argv);

function addLayout(numberOfLayouts) {
	var layouts = [];
	var groupId = program.groupId;
	var layoutNameBase = utils.generateLayoutName();
	var parentLayoutId = program.parentLayoutId;

	var bar = utils.getProgressBar(numberOfLayouts);

	utils.statusMessage(numberOfLayouts, 'layout');

	async.timesSeries(
		numberOfLayouts,
		function(n, callback) {
			var layoutName = layoutNameBase + ' ' + n;

			require('../../actions/add-layout.js')(groupId, layoutName, parentLayoutId, function(error, response) {
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
					console.log('New Layout:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new groups.');
			}
		}
	);

	return layouts;
}

module.exports = addLayout;