#!/usr/bin/env node

var _ = require('lodash');
var async = require('async');

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('user [userInfo]')
		.alias('u')
		.description('Gets one or more users from the database. If no user info is provided, it will return all users.')
		.action(function(userInfo) {
			actions.getUser(userInfo).then(function(users) {
				_.forEach(users, function(user) {
					console.log('User: ');
					outputUtil.printJSON(user);
					console.log('');
				});
			});
		});

	return program;
}
