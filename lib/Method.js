#!/usr/bin/env node

var promisify = require('bluebird').promisify;
var post = promisify(require('request').post);

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

	return post(requestData)
		.spread(function(response, body) {
			if (response.statusCode != 200) {
				throw new Error(body);
			}

			return JSON.parse(response.body);
		})
		.catch(console.log.bind(console));
}

module.exports = Method;