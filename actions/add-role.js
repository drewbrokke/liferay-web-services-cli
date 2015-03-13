var superb = require('superb');
var request = require('request');

module.exports = function(program) {
	var type = (0 < program.type < 4) ? program.type : 1;
	var typeLabel = getTypeLabel(type);

	var base = 'http://test@liferay.com:test@localhost:8080/api/jsonws';
	var action = '/role/add-role';
	var url = base + action;

	function addRole(index) {
		index = program.rolenamename ? index + 1 : '';

		var name = program.rolenamename || (superb().toUpperCase() + typeLabel);

		var role = {
			name: name,
			titleMap: JSON.stringify({
				"en_US": name
			}),
			descriptionMap: JSON.stringify({
				"en_US": name + " DESCRIPTION."
			}),
			type: type
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

			console.log('');
			console.log('ROLE ADDED');
			console.log('Name: ', role.name);
			console.log('RoleId: ', role.roleId);
		}
		else {
			console.log('Something went wrong...');
			console.log('STATUS CODE: ', response.statusCode);
			console.log('ERROR: ', error);
		}
	}

	function getTypeLabel(type) {
		if (type === 1) {
			return " Regular Role";
		}
		else if (type === 2) {
			return " Site Role";
		}
		else if (type === 3) {
			return " Organization Role";
		}
		else {
			return " Role";
		}
	}

	for (var i = 0; i < program.number; i++) {
		addRole(i);
	}
}