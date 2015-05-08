#!/usr/bin/env node

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');
var configHost = require('../../utils/configUtil').getCurrentHost();

module.exports = function(program) {
	program
		.command('company')
		.alias('c')
		.description('Gets the current company based on the virtual host.')
		.option('-v, --virtualHost <host address>', 'The virtual host to use to get the company.')
		.action(function(options) {
			var virtualHost = options.virtualHost || configHost;

			actions.getCompany(virtualHost, function(error, response) {
				outputUtil.printJSON(JSON.parse(response));
			});
		});

	return program;
}
