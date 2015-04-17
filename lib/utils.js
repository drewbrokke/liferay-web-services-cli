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

	generateUserInfo: function() {
		var person = {};

		person.firstName = chance.first();
		person.lastName = chance.last();
		person.emailAddress = person.firstName + person.lastName + '@liferay.com';
		person.screenName = person.firstName + person.lastName;

		return person;
	},

	generateRoleName: function(type) {
		return 'LWS ' + this.getRoleTypeLabel(type) + ': ' + chance.capitalize(chance.word());
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
		var actionFileList = fs.readdirSync(path.join(__dirname, './actions'));

		function indexAction(fileName) {
			var action = require(path.join(__dirname, './actions', fileName));

			var actionName = _.camelCase(fileName.replace('.js', ''));

			actions[actionName] = action;
		}

		_.forEach(actionFileList, indexAction);

		return actions;
	},

	getActionClass: function() {
		return require('./actionClass');
	},

	getConfig: function() {
		return require('./config');
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

	statusMessage: function(number, itemName) {
		console.log((number > 1) ? ('Adding ' + number + ' ' + itemName + 's...') : ('Adding ' + itemName + '...'));
	}
}