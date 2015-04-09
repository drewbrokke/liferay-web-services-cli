#!/usr/bin/env node

var randomName = require('node-random-name');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');
var superb = require('superb');
var _ = require('lodash');

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

		person.fullName = randomName();
		person.firstName = person.fullName.split(' ')[0];
		person.lastName = person.fullName.split(' ')[1];
		person.emailAddress = person.firstName + person.lastName + '@liferay.com';
		person.screenName = person.fullName.replace(' ', '');

		return person;
	},

	generateRoleName: function(type) {
		return 'LWS ' + _.startCase(superb()) + this.getRoleTypeLabel(type);
	},

	generateGroupName: function() {
		return 'LWS ' + _.startCase(superb()) + ' Site';
	},

	generateLayoutName: function() {
		return 'LWS ' + _.startCase(superb()) + ' Page';
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