#!/usr/bin/env node

var async = require('async');

var actions = require('../../lib/actions');
var addUserAction = require('../../actions/add-user.js');
var utils = require('../../lib/utils');

function addUser(numberOfUsers) {
	var users = [];
	var bar = utils.getProgressBar(numberOfUsers);

	utils.statusMessage(numberOfUsers, 'user');

	async.timesSeries(
		numberOfUsers,
		function(n, callback) {
			var person = utils.generateUserInfo();

			actions.addUser(person.firstName, person.lastName, person.screenName, person.emailAddress, function(error, response) {
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
					console.log('New User:');
					utils.printJSON(JSON.parse(results[i]));
					console.log('');
				}

				console.log('Successfully added', + results.length + ' new users.');
			}
		}
	);

	return users;
}

module.exports = addUser;