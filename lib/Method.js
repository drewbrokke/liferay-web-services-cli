#!/usr/bin/env node

var request = require('request');

var outputUtil = require('./utils/outputUtil');

var config = require('./utils/configUtil').getCurrentInstanceConfig();

function Method(methodPath, payload) {
	var methodPathBase = [
		'http://',
		config.host + ':',
		config.port + '/api/jsonws'
	].join('');

	this.methodPath = methodPathBase + methodPath;
	this.payload = payload;
}

Method.prototype.invoke = function(callback) {
	var payload = this.payload;

	var requestData = {
		url: this.methodPath,
		form: payload
	};

	function requestCallback(error, response, body) {
		if (!error) {
			if (response.statusCode === 200) {
				callback(null, body);
			}
			else {
				var serverError = JSON.parse(response.body).error;

				console.log('');
				outputUtil.printJSON(serverError);
				console.log('');
			}
		}
		else {
			console.error('ERROR: ', error);
			callback(error);
		}
	}

	try {
		if (!payload) {
			throw new Error('Missing payload object');
		}
		else if (!callback) {
			throw new Error('Missing callback function');
		}

		request
			.post(requestData, requestCallback)
			.auth(config.username, config.password);
	}
	catch(e) {
		console.error(e);
	}
}

module.exports = Method;