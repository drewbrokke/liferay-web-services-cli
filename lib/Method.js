#!/usr/bin/env node

var Promise = require('bluebird');
var request = Promise.promisifyAll(require('request'));

var outputUtil = require('./utils/outputUtil');

var config = require('./utils/configUtil').getCurrentInstanceConfig();

function Method(methodPath, payload) {
	var methodPathBase = [
		'http://',
		config.username + ':',
		config.password + '@',
		config.host + ':',
		config.port + '/api/jsonws'
	].join('');

	this.methodPath = methodPathBase + methodPath;
	this.payload = payload;
}

Method.prototype.invoke = function() {
	var payload = this.payload;

	var requestData = {
		url: this.methodPath,
		form: payload
	};

	return request.postAsync(requestData)
		.spread(function(response, body) {
			if (response.statusCode != 200) {
				throw new Error(body);
			}

			return JSON.parse(response.body);
		})
		.catch(console.error);
}

module.exports = Method;