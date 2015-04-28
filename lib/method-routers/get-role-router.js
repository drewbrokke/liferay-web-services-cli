#!/usr/bin/env node

function routeGetRoleAction(input) {
	var methodName;

	if (!isNaN(parseInt(input, 10))) {
		methodName = 'getRoleById';
	}
	else {
		methodName = 'getRoleByName';
	}

	return methodName;
}

module.exports = routeGetRoleAction;