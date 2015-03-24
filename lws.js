#!/usr/bin/env node

var program = require('commander');

function list(val) {
	return val.split(',');
}

program
	.version('0.0.2')
	.command('adduser')
	.description('Add a new user to the database.')
	.option('-f, --firstname <name>', 'The first name to use when creating a user or users. If no name is provided the one will be generated. [optional]')
	.option('-l, --lastname <name>', 'The last name to use when creating a user or users. If no name is provided the one will be generated. [optional]')
	.option('-N, --number <number of users>', 'The number of users to create. [optional]', Number, 1)
	.option('-s, --silly', 'Generate a silly name. [optional]')
	.action(function() {
		console.log('Adding user...');

		function addUserCallback(error, response) {
			if (!error) {
				var person = JSON.parse(response);

				console.log('');
				console.log('USER ADDED');
				console.log('Name: ', person.firstName + ' ' + person.lastName + '');
				console.log('Password: test');
				console.log('UserId: ', person.userId);
			}
		}

		for (var i = 0; i < this.number; i++) {
			require('./actions/add-user.js')(this, addUserCallback);
		}
	});

program
	.command('addrole')
	.description('Add a new role to the database.')
	.option('-r, --rolename <role name>', 'The name of the role. If no name is provided the one will be generated. [optional]')
	.option('-t, --type <type>', 'The type of role. Uses integer value. Defaults to 1.', Number, 1)
	.option('-N, --number <number of users>', 'The number of users to create. [optional]', Number, 1)
	.action(function() {
		console.log('Adding role...');

		function addRoleCallback(error, body) {
			if (!error) {
				var role = JSON.parse(body);

				console.log('');
				console.log('ROLE ADDED');
				console.log('Name: ', role.name);
				console.log('RoleId: ', role.roleId);
			}
		}

		for (var i = 0; i < this.number; i++) {
			require('./actions/add-role.js')(this, addRoleCallback);
		}
	});

program
	.command('adduserrole')
	.description('Add a role to a user.')
	.option('-r, --role <roleId>', 'The role id to add to the user.', Number)
	.option('-u, --user <userId>', 'User id to add a role to.', Number)
	.action(function() {
		function addUserRoleCallback(error, body) {
			if (!error) {
				console.log('');
				console.log('Role Added.');
			}
		}

		try {
			if (!this.user) {
				throw new Error('A userId is required.');
			}
			else if (!this.role) {
				throw new Error('At least one roleId is required.')
			}
			else {
				console.log('Adding roleId %j to user with Id %j', this.role, this.user);

				require('./actions/add-user-role.js')(this, addUserRoleCallback);
			}
		}
		catch(e) {
			console.error('');
			console.error(e);
			console.error('');
		}
	});

program
	.command('addnewuserrole')
	.action(function() {
		console.log('Adding user...');

		var program = this;

		function addUserRoleCallback(error, response) {
			if (!error) {

				console.log('Added user %j, role %j, and added role to user', program.generatedUser, program.generatedRole);
			}
		}

		function addRoleCallback(error, response) {
			if (!error) {
				var role = JSON.parse(response);

				program.generatedRole = role;
				program.role = program.generatedRole.roleId;

				require('./actions/add-user-role.js')(program, addUserRoleCallback);
			}
		}


		function addUserCallback(error, response) {
			if (!error) {
				var person = JSON.parse(response);

				program.generatedUser = person;
				program.user = program.generatedUser.userId;
				program.type = 1;

				require('./actions/add-role.js')(program, addRoleCallback);
			}
		}

		require('./actions/add-user.js')(program, addUserCallback);
	});

program
	.command('getrole <id or name>')
	.description('Get a role from its roleId or its name. Requires one or the other')
	.action(function(thing) {
		try {
			console.log('thing: ', thing);
			if (false) {
				throw new Error('Please use only an id or a name.');
			}
			else {
				console.log('Getting role...');

				require('./actions/get-role.js')(this);
			}
		}
		catch(e) {
			console.log('');
			console.log(e);
			console.log('');
		}
	})

// # adduser
// # addrole
// # adduserrole
// getrole
// addpermission

program.parse(process.argv);
