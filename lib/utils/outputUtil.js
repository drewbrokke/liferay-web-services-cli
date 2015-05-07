#!/usr/bin/env node

var _ = require('lodash');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');

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