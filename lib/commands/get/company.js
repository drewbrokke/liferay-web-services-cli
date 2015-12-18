#!/usr/bin/env node

var actions = require('../../actions');
var outputUtil = require('../../utils/outputUtil');
var configMailDomain = require('../../utils/configUtil').getCurrentMailDomain();

module.exports = function(program) {
	program
		.command('company')
		.alias('c')
		.description('Gets the current company based on the mail domain.')
		.option('-m, --mailDomain <mail domain>', 'The mail domain of the company to get.')
		.action(function(options) {
			var mailDomain = options.mailDomain || configMailDomain;

			actions.getCompany(mailDomain).then(function(company) {
				outputUtil.printJSON(company);
			});
		});

	return program;
};