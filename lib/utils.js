#!/usr/bin/env node

var _ = require('lodash');
var Chance = require('chance');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');
var fs = require('fs');
var path = require('path');

var chance = new Chance();

module.exports = {
	generateGroupName: function() {
		return 'LWS Site: ' + chance.capitalize(chance.word());
	},

	generateLayoutName: function() {
		return 'LWS Page: ' + chance.capitalize(chance.word());
	},

	generateOrganizationName: function() {
		return 'LWS Organization: ' + chance.capitalize(chance.word());
	},

	generateUserGroupName: function() {
		return 'LWS User Group: ' + chance.capitalize(chance.word());
	},

	generateUserInfo: function() {
		var person = {};

		person.firstName = chance.first();
		person.lastName = chance.last();
		person.emailAddress = person.firstName + person.lastName + '@liferay.com';
		person.screenName = person.firstName + person.lastName;

		return person;
	},

	generateRoleName: function(type) {
		return 'LWS' + this.getRoleTypeLabel(type) + ': ' + chance.capitalize(chance.word());
	},

	getProgressBar: function(length) {
		return new ProgressBar(':current/:total [:bar] :etas', {
			total: length,
			complete: '=',
			incomplete: ' '
		});
	},

	getMethods: function() {
		var methods = {};
		var methodDirPath = path.join(__dirname, './methods');
		var methodFileList = fs.readdirSync(methodDirPath);

		function indexAction(fileName) {
			var method = require(path.join(methodDirPath, fileName));

			var methodName = _.camelCase(fileName.replace('.js', ''));

			methods[methodName] = method;
		}

		_.forEach(methodFileList, indexAction);

		return methods;
	},

	getMethodClass: function() {
		return require('./Method');
	},

	getCommands: function(type) {
		var commands = {};
		var commandDirPath = path.join(__dirname, './commands', type);
		var commandFileList = fs.readdirSync(commandDirPath);

		function indexCommand(fileName) {
			var command = require(path.join(commandDirPath, fileName)).command;
			var commandName = _.camelCase(type + '-' + fileName.replace('.js', ''));

			commands[commandName] = command;
		}

		_.forEach(commandFileList, indexCommand);

		return commands;
	},

	getConfig: function() {
		return require('./config');
	},

	getCurrentCompanyId: function() {
		var currentInstanceConfig = this.getConfig().getCurrentInstanceConfig().companyId || 20152;

		return currentInstanceConfig;
	},

	getMethodRouters: function() {
		var methodRouters = {};
		var methodRouterFileList = fs.readdirSync(path.join(__dirname, './method-routers'));

		function indexAction(fileName) {
			var methodRouter = require(path.join(__dirname, './method-routers', fileName));

			var methodRouterName = _.camelCase(fileName.replace('.js', ''));

			methodRouters[methodRouterName] = methodRouter;
		}

		_.forEach(methodRouterFileList, indexAction);

		return methodRouters;
	},

	getRoleTypeLabel: function(type) {
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
	},

	printJSON: function(obj) {
		var options = {
			stringColor: 'yellow'
		}

		obj = _.omit(obj, function(value) {
			return !value;
		});

		console.log(prettyjson.render(obj, options));
	},

	// Registers all command files in the given category (subdirectory of './commands')  with Commander
	registerCommands: function(program, category) {
		var commandsPath = path.join(__dirname, './commands', category);
		var commandsList = fs.readdirSync(commandsPath);

		_.forEach(commandsList, function(command) {
			program = require(path.join(commandsPath, command)).registerCommand(program);
		});

		return program;
	},

	statusMessage: function(number, itemName) {
		console.log((number > 1) ? ('Adding ' + number + ' ' + itemName + 's...') : ('Adding ' + itemName + '...'));
	}
}