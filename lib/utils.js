#!/usr/bin/env node

var prettyjson = require('prettyjson');
var ProgressBar = require('progress');
var superb = require('superb');
var Chance = require('chance');

var chance = new Chance();

module.exports = {
	list: function(val) {
		return val.split(',');
	},

	printJSON: function(obj) {
		var options = {
			stringColor: 'yellow'
		}

		console.log(prettyjson.render(obj, options));
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

	generateGroupName: function() {
		return 'LWS Site: ' + chance.capitalize(chance.word());
	},

	generateLayoutName: function() {
		return 'LWS Page: ' + chance.capitalize(chance.word());
	},

	getProgressBar: function(length) {
		return new ProgressBar(':current/:total [:bar] :etas', {
			total: length,
			complete: '=',
			incomplete: ' '
		});
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

	statusMessage: function(number, itemName) {
		console.log((number > 1) ? ('Adding ' + number + ' ' + itemName + 's...') : ('Adding ' + itemName + '...'));
	}
}