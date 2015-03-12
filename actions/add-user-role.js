var request = require('request');

module.exports = function(args) {
	var base = 'http://test@liferay.com:test@localhost:8080/api/jsonws';
	var action = '/role/add-user-roles';
	var url = base + action;

	var invalidRoleIds = [];
	var verifyCount = 0;

	function attemptSendRequest() {
		if (verifyCount === roleIds.length) {
			if (!invalidRoleIds.length) {
				request.post(
					{
						url: url,
						form: user
					},
					callback
				);
			}
			else {
				console.log('Cannot send request.');
				for (var i = 0, length = invalidRoleIds.length; i < length; i ++) {
					console.log('Role Id ' + invalidRoleIds[i] + ' is not a valid ID.');
				}
			}
		}
	}

	function callback(error, response, body) {
		if (!error && (response.statusCode == 200)) {
			var response = JSON.parse(body);
			console.log('response: ', response);
		}
		else {
			console.log('Something went wrong...');
			console.log('STATUS CODE: ', response.statusCode);
			console.log('ERROR: ', error);
		}
	}

	function verifyRole(roleId) {
		request.post(
			{
				url: 'http://test@liferay.com:test@localhost:8080/api/jsonws/role/get-role',
				form: {
					roleId: roleId
				}
			},
			function(error, response, body) {
				if (!error && (response.statusCode === 200)) {}
				else {
					invalidRoleIds.push(roleId);
				}

				verifyCount++;
				attemptSendRequest();
			}
		);
	}

	var roleIds = args.role || args.r;

	if (roleIds && !Array.isArray(roleIds)) {
		var tempArray = [];
		tempArray.push(roleIds);
		roleIds = tempArray;
	}

	var user = {
		userId: args.user || args.u,
		roleIds: JSON.stringify(roleIds)
	};

	if (roleIds) {
		for (var i = 0, length = roleIds.length; i < length; i ++) {
			verifyRole(roleIds[i]);
		}
	}
	else {
		console.log('Please include at least one role ID to add.');
	}


	// if (rolesVerified) {
	// 	request.post(
	// 		{
	// 			url: url,
	// 			form: user
	// 		},
	// 		callback
	// 	);
	// }
}