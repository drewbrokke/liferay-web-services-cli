#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var methods = utils.getMethods();
var methodRouters = utils.getMethodRouters();


function registerCommand(program) {
	program
		.command('user [userInfo...]')
		.alias('u')
		.description('Gets one or more users from the database. If no user info is provided, it will return all users.')
		.action(function(userInfo) {
			getUser(userInfo);
		});

	return program;
}

function getUser(userInfo, callback) {
	if (userInfo.length) {
		// Get Users from provided info
		async.timesSeries(
			userInfo.length,
			function(n, asyncCallback) {
				var getUserAction = methodRouters.getUserRouter(userInfo[n]);

				methods[getUserAction](
					userInfo[n],
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
						console.log('Got User:');
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
	else {
		// Get all users in the company
		methods.getCompanyUsers(
			function(error, response) {
				if (!error) {
					var users = JSON.parse(response);

					console.log('');

					_.forEach(users, function(user) {
						console.log('Got User:');
						user = _.pick(user, ['screenName', 'firstName', 'lastName', 'emailAddress', 'userId']);

						utils.printJSON(user);
						console.log('');
					})
				}
			}
		);
	}
}

module.exports.registerCommand = registerCommand;
module.exports.command = getUser;
