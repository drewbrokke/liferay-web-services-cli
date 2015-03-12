var request = require('request');
var argv = require('minimist')(process.argv.slice(2));

var command = argv._[0];
var number = argv.n || argv.number;

if (command === 'adduser') {
	console.log('Adding user...');
	require('./actions/add-user.js')(argv);
}
else if (command === 'addrole') {
	console.log('Adding role...');
	require('./actions/add-role.js')(argv);
}
else if (command === 'adduserrole') {
	console.log('Adding roles to user...');
	require('./actions/add-user-role.js')(argv);
}
else if (command === 'getrole') {
	console.log('Getting role...');
	require('./actions/get-role.js')(argv);
}
else if (command === 'addpermission') {
	console.log('Adding permission...');
	require('./actions/add-resource-permission.js')(argv);
}
else {
	console.log('Available commands:');

	console.log('adduser');
	console.log('addrole');
	console.log('adduserrole');
	console.log('getrole');
	console.log('addpermission');
}