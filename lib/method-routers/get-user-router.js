#!/usr/bin/env node

function routeGetUserAction(input) {
	var methodName;

	if (!isNaN(parseInt(input, 10))) {
		methodName = 'getUserById';
	}
	else if (input.indexOf('@') != -1) {
		methodName = 'getUserByEmailAddress';
	}
	else {
		methodName = 'getUserByScreenName';
	}

	return methodName;
}

module.exports = routeGetUserAction;