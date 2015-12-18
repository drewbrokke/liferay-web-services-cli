#!/usr/bin/env node

var Promise = require('bluebird');
var postMethod = require('request').post;

var config = require('./utils/configUtil').getCurrentInstanceConfig();

function post(requestData) {
	return new Promise(function(resolve, reject) {
		postMethod(requestData, function(err, response, body) {
			if (!err) {
				if (response.statusCode != 200) {
					reject(new Error(body));
				}
				else {
					resolve(JSON.parse(response.body));
				}
			}
			else {
				console.log('');
				console.log('No response from the server.');
				console.log('');
				console.log('Make sure your server is running and that your configuartion is correct.');
				console.log('You can change your configuration using the \'lws config\' command.');
				console.log('');

				console.error(err.stack);
			}
		}).auth(config.username + '@' + config.mailDomain, config.password);
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
	};

	return post(requestData)
		.then(function(response) {
			return response;
		})
		.catch(function(error) {
			console.log(error.stack);
		});
};

module.exports = Method;