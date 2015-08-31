#!/usr/bin/env node

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');

module.exports = function(program) {
	program
		.command('user [userInfo]')
		.alias('u')
		.description('Gets one or more users from the database. If no user info is provided, it will return all users.')
		.action(function(userInfo) {
			actions.getUser(userInfo).then(function(users) {
				outputUtil.printTable(users, 'user');
			});
		});

	return program;
}
