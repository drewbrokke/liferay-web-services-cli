#!/usr/bin/env node

var _ = require('lodash');
var Chance = require('chance');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');
var fs = require('fs');
var path = require('path');

var chance = new Chance();

module.exports = {
	getActions: function() {
		return require('./actions');
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
			program = require(path.join(commandsPath, command))(program);
		});

		return program;
	},

	newObjectCallback: function(jsonData, type) {
		console.log('');
		console.log('New ' + _.capitalize(type) + ':');
		this.printJSON(jsonData);
		console.log('');
	},

	statusMessage: function(number, itemName) {
		console.log((number > 1) ? ('Adding ' + number + ' ' + itemName + 's...') : ('Adding ' + itemName + '...'));
	}
}