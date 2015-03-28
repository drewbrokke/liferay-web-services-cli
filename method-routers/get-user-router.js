#!/usr/bin/env node

function routeGetUserAction(input) {
	var actionURL;

	var infoTypeActions = {
		id: '../actions/get-user-by-id',
		screenName: '../actions/get-user-by-screen-name',
		email: '../actions/get-user-by-email-address'
	}

	if (!isNaN(parseInt(input, 10))) {
		actionURL = infoTypeActions.id;
	}
	else if (input.indexOf('@') != -1) {
		actionURL = infoTypeActions.email;
	}
	else {
		actionURL = infoTypeActions.screenName;
	}

	return actionURL;
}

module.exports = routeGetUserAction;