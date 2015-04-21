#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var utils = require('../../utils');

var actions = utils.getActions();

function registerCommand(program) {
	program
		.command('user [quantity]')
		.alias('u')
		.description('Adds one or more users to the database.')
		.action(function(number) {
			number = !_.isNaN(Number(number)) ? Number(number) : 1;
			addUser(number);
		});

	return program;
}

function addUser(numberOfUsers, callback) {
	var users = [];
	var bar = utils.getProgressBar(numberOfUsers);

	utils.statusMessage(numberOfUsers, 'user');

	async.timesSeries(
		numberOfUsers,
		function(n, asyncCallback) {
			var person = utils.generateUserInfo();

			actions.addUser(
				person.firstName,
				person.lastName,
				person.screenName,
				person.emailAddress,
				function(error, response) {
					if (!error) {
						bar.tick();
						asyncCallback(null, response);
					}
				}
			);
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

				if (callback) {
					callback(null, results);
				}
			}
		}
	);

	return users;
}

module.exports.registerCommand = registerCommand;
module.exports.command = addUser;
