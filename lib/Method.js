#!/usr/bin/env node

var Promise = require('bluebird');
var postMethod = require('request').post;

var config = require('./utils/configUtil').getCurrentInstanceConfig();

function post(requestData) {
	return new Promise(function(resolve, reject) {
		postMethod(requestData, function(err, response, body) {
			if (response.statusCode != 200) {
				reject(new Error(body));
			}
			else {
				resolve(JSON.parse(response.body));
			}
		}).auth(config.username, config.password);
	});
}

function Method(methodPath, payload) {
	var methodPathBase = [
		'http://',
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
	}

	return post(requestData)
		.then(function(response) {
			return response;
		})
		.catch(function(error) {
			console.log(error.stack);
		});
}

module.exports = Method;