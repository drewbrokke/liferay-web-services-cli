#!/usr/bin/env node

function routeGetUserAction(input) {
	var actionName;

	if (!isNaN(parseInt(input, 10))) {
		actionName = 'getUserById';
	}
	else if (input.indexOf('@') != -1) {
		actionName = 'getUserByEmailAddress';
	}
	else {
		actionName = 'getUserByScreenName';
	}

	return actionName;
}

module.exports = routeGetUserAction;