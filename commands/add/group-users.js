#!/usr/bin/env node

var async = require('async');

var utils = require('../../lib/utils');

var actions = utils.getActions();

function addGroupUsers(groupId, userIds, callback) {
	if (!groupId) {
		console.error('No group ID provided');
	}

	if (!userIds) {
		console.error('No user IDs provided');
	}

	actions.addGroupUsers(
		groupId,
		userIds,
		function(error, response) {
			if (!error) {
				console.log('Added users to the site!');
			}
		}
	);
}

module.exports = addGroupUsers;
