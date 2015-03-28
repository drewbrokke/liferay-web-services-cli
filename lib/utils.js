#!/usr/bin/env node

var prettyjson = require('prettyjson');
var ProgressBar = require('progress');

module.exports = {
	list: function(val) {
		return val.split(',');
	},

	logJSON: function(obj) {
		var options = {
			stringColor: 'yellow'
		}

		console.log(prettyjson.render(obj, options));
	},

	getProgressBar: function(length) {
		return new ProgressBar(':current/:total [:bar] :etas', {
			total: length,
			complete: '=',
			incomplete: ' '
		});
	},

	statusMessage: function(number, itemName) {
		console.log((number > 1) ? ('Adding ' + number + ' ' + itemName + 's...') : ('Adding ' + itemName + '...'));
	}
}