#!/usr/bin/env node

var async = require('async');

var utils = require('../../lib/utils');

var actions = utils.getActions();
var methodRouters = utils.getMethodRouters();

function getRole(roleInfo, callback) {
	if (!roleInfo.length) {
		console.error('Please provide role info.');
	}

	async.timesSeries(
		roleInfo.length,
		function(n, asyncCallback) {
			var getRoleAction = methodRouters.getRoleRouter(roleInfo[n]);

			actions[getRoleAction](
				roleInfo[n],
				function(error, response) {
					if (!error) {
						asyncCallback(null, response);
					}
				}
			);
		},
		function(error, results) {
			if (!error) {
				for (var i = 0, length = results.length; i < length; i++) {
					console.log('');
					console.log('Got Role:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				if (callback) {
					callback(null, results);
				}
			}
		}
	);
}

module.exports = getRole;