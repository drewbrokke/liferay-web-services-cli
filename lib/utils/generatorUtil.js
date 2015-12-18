#!/usr/bin/env node

var Chance = require('chance');

var chance = new Chance();

var mailDomain = require('./configUtil').getCurrentInstanceConfig().mailDomain;

module.exports = {
	generateGroupName: function() {
		return 'LWS Site: ' + chance.capitalize(chance.word());
	},

	generateLayoutName: function() {
		return 'LWS Page: ' + chance.capitalize(chance.word());
	},

	generateOrganizationName: function() {
		return 'LWS Organization: ' + chance.capitalize(chance.word());
	},

	generateUserGroupName: function() {
		return 'LWS User Group: ' + chance.capitalize(chance.word());
	},

	generateUserInfo: function() {
		var person = {};
		var male = chance.bool();
		var gender = {
			gender: 'male'
		};

		if (!male) {
			gender.gender = 'female';
		}

		person.firstName = chance.first(gender);
		person.lastName = chance.last();
		person.emailAddress = person.firstName + person.lastName + '@' + mailDomain;
		person.screenName = person.firstName + person.lastName;
		person.male = male;

		return person;
	},

	generateRoleName: function(type) {
		return 'LWS' + this.getRoleTypeLabel(type) + ': ' + chance.capitalize(chance.word());
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
	}
};