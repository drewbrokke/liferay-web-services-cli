var superb = require('superb');
var request = require('request');

module.exports = function(program) {
	var base = 'http://test@liferay.com:test@localhost:8080/api/jsonws';
	var action = '/role/get-role';
	var url = base + action;

	function getRole() {
		var role = {};

		var roleId = program.id;
		var roleName = program.rolename;

		if (roleId) {
			role.roleId = roleId;
		}
		else if (roleName) {
			role.name = roleName;
			role.companyId = 20152;
		}

		var postData = {
			url: url,
			form: role
		};

		request.post(
			{
				url: url,
				form: role
			},
			callback
		);
	}

	function callback(error, response, body) {
		if (!error && (response.statusCode == 200)) {
			var role = JSON.parse(body);

			console.log('ROLE: ', role);
		}
		else {
			console.log('Something went wrong...');
			console.log('STATUS CODE: ', response.statusCode);
			console.log('ERROR: ', error);
		}
	}

	getRole();
}