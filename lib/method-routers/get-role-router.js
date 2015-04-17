#!/usr/bin/env node

function routeGetRoleAction(input) {
	var actionName;

	if (!isNaN(parseInt(input, 10))) {
		actionName = 'getRoleById';
	}
	else {
		actionName = 'getRoleByName';
	}

	return actionName;
}

module.exports = routeGetRoleAction;