var request = require('request');
var Action = require('../actionClass');

module.exports = function(program, callback) {
	request.post(
		{
			// Verify roleId
			url: 'http://test@liferay.com:test@localhost:8080/api/jsonws/role/get-role',
			form: {
				roleId: program.role
			}
		},
		function(error, response, body) {
			if (!error && (response.statusCode === 200)) {
				console.log('Valid role id. Adding role to user...');

				var roleIds = [];
				roleIds.push(program.role);

				var userRole = {
					userId: program.user,
					roleIds: JSON.stringify(roleIds)
				};

				var action = new Action('/role/add-user-roles', userRole);

				action.doAction(callback);
			}
			else {
				console.log('Cannot send request.');
				console.log('Not a valid Role ID.');
			}
		}
	);
}