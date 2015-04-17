#!/usr/bin/env node

var async = require('async');

var utils = require('../../lib/utils');

var actions = utils.getActions();

function addOrganization(numberOfOrganizations, parentOrganizationId, callback) {
	var bar = utils.getProgressBar(numberOfOrganizations);
	var organizations = [];

	utils.statusMessage(numberOfOrganizations, 'organization');

	async.timesSeries(
		numberOfOrganizations,
		function(n, asyncCallback) {
			var organizationName = utils.generateOrganizationName();

			actions.addOrganization(organizationName, function(error, response) {
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
					console.log('New Organization:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new organizations.');

				if (callback) {
					callback(null, results);
				}
			}
		}
	);

	return organizations;
}

module.exports = addOrganization;