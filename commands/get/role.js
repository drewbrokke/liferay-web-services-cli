#!/usr/bin/env node

var async = require('async');

var actions = require('../../lib/actions');
var getRoleActionRouter = require('../../method-routers/get-role-router');
var utils = require('../../lib/utils');

function getRole(roleInfo) {

	if (!roleInfo.length) {
		console.error('Please provide role info.');
	}

	async.timesSeries(
		roleInfo.length,
		function(n, asyncCallback) {
			var getRoleAction = getRoleActionRouter(roleInfo[n]);

			actions[getRoleAction](roleInfo[n], function(error, response) {
				if (!error) {
					asyncCallback(null, response);
				}
			});
		},
		function(error, results) {
			if (!error) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('Got Role:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}
			}
		}
	);
}

module.exports = getRole;