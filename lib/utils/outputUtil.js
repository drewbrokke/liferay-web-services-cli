#!/usr/bin/env node

var _ = require('lodash');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');
var Table = require('cli-table');

var tableKeys = {
	group: ['groupId', 'groupKey', 'friendlyURL', 'treePath'],
	layout: ['layoutId', 'nameCurrentValue', 'friendlyURL', 'groupId'],
	organization: ['organizationId', 'name', 'treePath', 'type'],
	role: ['roleId', 'name', 'type'],
	user: ['userId', 'screenName', 'firstName', 'lastName', 'emailAddress', 'contactId'],
	userGroup: ['userGroupId', 'name']
}

var tableColors = {
	group: 'red',
	layout: 'magenta',
	organization: 'blue',
	role: 'yellow',
	user: 'green',
	userGroup: 'cyan'
}

module.exports = {
	getProgressBar: function(length) {
		return new ProgressBar(':current/:total [:bar] :etas', {
			total: length,
			complete: '=',
			incomplete: ' '
		});
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

	printTable: function(dataArray, modelType){
		var keys = tableKeys[modelType];

		var table = new Table({
			head: keys,
			style: {
				'head': [tableColors[modelType], 'bold']
			}
		});

		_.forEach(dataArray, function(user) {
			var valArray = [];

			_.forEach(keys, function(key) {
				valArray.push(user[key]);
			});

			table.push(valArray);
		});

		console.log(table.toString());
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