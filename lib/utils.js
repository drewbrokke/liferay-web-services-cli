#!/usr/bin/env node

var _ = require('lodash');
var Chance = require('chance');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');
var superb = require('superb');
var Chance = require('chance'),

chance = new Chance();

module.exports = {
	list: function(val) {
		return val.split(',');
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
	},

	generateDescription: function() {
		return chance.paragraph();
	},

	generateName: function() {
		return _.startCase(superb());
	},

	generateLocation: function() {
		return chance.country({ full: true });
	}
};