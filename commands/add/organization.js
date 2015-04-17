#!/usr/bin/env node

var async = require('async');

var utils = require('../../lib/utils');

var actions = utils.getActions();

function addOrganization(numberOfOrganizations, parentOrganizationId) {
	var bar = utils.getProgressBar(numberOfOrganizations);
	var organizations = [];

	utils.statusMessage(numberOfOrganizations, 'organization');

	async.timesSeries(
		numberOfOrganizations,
		function(n, callback) {
			var organizationName = utils.generateOrganizationName();

			actions.addOrganization(organizationName, function(error, response) {
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
					console.log('New Organization:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new organizations.');
			}
		}
	);

	return organizations;
}

module.exports = addOrganization;