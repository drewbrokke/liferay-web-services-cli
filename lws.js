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

		require('./actions/add-user.js')(this);
	});

program
	.command('addrole')
	.description('Add a new role to the database.')
	.option('-r, --rolename <role name>', 'The name of the role. If no name is provided the one will be generated. [optional]')
	.option('-t, --type <type>', 'The type of role. Uses integer value. Defaults to 1.', Number, 1)
	.option('-N, --number <number of users>', 'The number of users to create. [optional]', Number, 1)
	.action(function() {
		console.log('Adding role...');

		require('./actions/add-role.js')(this);
	});

program
	.command('adduserrole')
	.description('Add a role to a user.')
	.option('-r, --roles <roleIds>', 'One or more roleIds separated by commas.', list)
	.option('-u, --user <userId>', 'User id to add a role to.', Number)
	.action(function() {
		try {
			if (!this.user) {
				throw new Error('A userId is required.');
			}
			else if (!this.roles) {
				throw new Error('At least one roleId is required.')
			}
			else {
				console.log('Adding roleIds(s) %j to user with Id %j', this.roles, this.user);
				require('./actions/add-user-role.js')(this);
			}
		}
		catch(e) {
			console.log('');
			console.log(e);
			console.log('');
		}
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
