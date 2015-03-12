// long PRIMKEY_DNE = -1;

// int SCOPE_COMPANY = 1;

// int SCOPE_GROUP = 2;

// int SCOPE_GROUP_TEMPLATE = 3;

// int SCOPE_INDIVIDUAL = 4;


// 1 - Company scope - primKey is the primary key of the company

// 2 - Group scope - primKey is the primary key of the group the
// permission applies within

// 3 - Group-template scope - primKey is always 0

// 4 - Individual scope - If the permission applies to a model instance,
// primkey will be the primary key of the instance. If the
// permission is for a portlet, primKey will contain the primary
// key of the layout containing the portlet, followed by "_LAYOUT_"
// and the portlet ID. The instance ID will also be present for instanceable
// portlets, preceded by "_INSTANCE_".

var request = require('request');

module.exports = function(args) {
	var base = 'http://test@liferay.com:test@localhost:8080/api/jsonws';
	var action = '/resourcepermission/add-resource-permission';
	var url = base + action;

	function callback(error, response, body) {
		if (!error && (response.statusCode == 200)) {
			var permission = JSON.parse(body);
			console.log('permission: ', permission);
		}
		else {
			console.log('Something went wrong...');
			console.log('STATUS CODE: ', response.statusCode);
			console.log('ERROR: ', error);
		}
	}

	var permission = {
		groupId: 0,
		companyId: 20152,
		name: '90',
		scope: 1,
		primKey: 0,
		roleId: 22492,
		actionId: 'VIEW'
	};

	request.post(
		{
			url: url,
			form: permission
		},
		callback
	);
}