#!/usr/bin/env node

var request = require('request');
var utils = require('./utils');

var instanceConfig = utils.getConfig().getCurrentInstanceConfig();

function Action(actionPath, payload) {
	var actionPathBase = [
		'http://',
		instanceConfig.username + ':',
		instanceConfig.password + '@',
		instanceConfig.host + ':',
		instanceConfig.port + '/api/jsonws'
	].join('');

	this.actionPath = actionPathBase + actionPath;
	this.payload = payload;
}

Action.prototype.doAction = function(callback) {
	var payload = this.payload;

	try {
		if (!payload) {
			throw new Error('Missing payload object');
		}
		if (!callback) {
			throw new Error('Missing callback function');
		}
		request.post(
			{
				url: this.actionPath,
				form: payload
			},
			function(error, response, body) {
				if (!error) {
					if (response.statusCode === 200) {
						callback(null, body);
					}
					else {
						var serverError = JSON.parse(response.body).error;

						console.log('');
						utils.printJSON(serverError);
						console.log('');
					}
				}
				else {
					console.error('ERROR: ', error);
					callback(error);
				}
			}
		);
	}
	catch(e) {
		console.error(e);
	}
}

module.exports = Action;