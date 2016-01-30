#!/usr/bin/env node

var _ = require('lodash');
var chalk = require('chalk');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');
var Table = require('cli-table');

module.exports = {
	getProgressBar: function(length) {
		return new ProgressBar(':current/:total [:bar] :etas', {
			total: length,
			complete: '=',
			incomplete: ' '
		});
	},

	printError: function(message) {
		console.error(chalk.red(message));
	},

	printJSON: function(obj) {
		var options = {
			stringColor: 'yellow'
		};

		obj = _.omit(obj, function(value) {
			return !value;
		});

		console.log(prettyjson.render(obj, options));
	},

	printSuccess: function(message) {
		console.log(chalk.green(message));
	},

	printTable: function(headerKeys, valuesArray) {
		var table = new Table({
			head: headerKeys,
			style: {
				'head': ['green', 'bold']
			}
		});

		_.forEach(valuesArray, function(arr) {
			table.push(arr);
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
};