#!/usr/bin/env node

function routeGetRoleAction(input) {
	var actionURL;

	var infoTypeActions = {
		id: '../actions/get-role-by-id',
		name: '../actions/get-role-by-name'
	}

	if (!isNaN(parseInt(input, 10))) {
		actionURL = infoTypeActions.id;
	}
	else {
		actionURL = infoTypeActions.name;
	}

	return actionURL;
}

module.exports = routeGetRoleAction;