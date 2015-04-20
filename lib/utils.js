#!/usr/bin/env node

var _ = require('lodash');
var faker = require('faker');
var fs = require('fs');
var path = require('path');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');

function fakerAdjective() {
	return _.startCase(faker.company.bsAdjective()) + ' ';
}

function fakerNoun() {
	return _.startCase(faker.company.bsNoun()) + ' ';
}

function fakerCatchPhraseNoun() {
	return _.startCase(faker.company.catchPhraseNoun()) + ' ';
}

function fakerRandomNumber() {
	return faker.random.number(999);
}

module.exports = {
	generateGroupName: function() {
		return [
			'LWS ',
			fakerAdjective(),
			fakerNoun(),
			'Site ',
			fakerRandomNumber()
		].join('');
	},

	generateLayoutName: function() {
		return [
			'LWS ',
			fakerAdjective(),
			fakerNoun(),
			'Page ',
			fakerRandomNumber()
		].join('');
	},

	generateOrganizationName: function() {
		return 'LWS Organization: ' + _.startCase(faker.company.companyName()) + ' ' + fakerRandomNumber();
	},

	generateUserGroupName: function() {
		return [
			'LWS ',
			fakerAdjective(),
			fakerCatchPhraseNoun(),
			'User Group ',
			fakerRandomNumber()
		].join('');
	},

	generateRoleName: function(type) {
		return [
			'LWS ',
			fakerAdjective(),
			fakerNoun(),
			this.getRoleTypeLabel(type) + ' ',
			fakerRandomNumber()

		].join('');
	},

	generateUserInfo: function() {
		var person = {};

		person.firstName = _.trim(faker.name.firstName(), '\'');
		person.lastName = _.trim(faker.name.lastName(), '\'');
		person.emailAddress = person.firstName + person.lastName + '@liferay.com';
		person.screenName = person.firstName + person.lastName;

		return person;
	},

	getProgressBar: function(length) {
		return new ProgressBar(':current/:total [:bar] :etas', {
			total: length,
			complete: '=',
			incomplete: ' '
		});
	},

	getActions: function() {
		var actions = {};
		var actionDirPath = path.join(__dirname, './actions');
		var actionFileList = fs.readdirSync(actionDirPath);

		function indexAction(fileName) {
			var action = require(path.join(actionDirPath, fileName));

			var actionName = _.camelCase(fileName.replace('.js', ''));

			actions[actionName] = action;
		}

		_.forEach(actionFileList, indexAction);

		return actions;
	},

	getActionClass: function() {
		return require('./actionClass');
	},

	getCommands: function(type) {
		var commands = {};
		var commandDirPath = path.join(__dirname, '../commands', type);
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
			return "Regular Role";
		}
		else if (type === 2) {
			return "Site Role";
		}
		else if (type === 3) {
			return "Organization Role";
		}
		else {
			return "Role";
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

	// Registers all command files in the given category (subdirectory of '../commands')  with Commander
	registerCommands: function(program, category) {
		var commandsPath = path.join(__dirname, '../commands', category);
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