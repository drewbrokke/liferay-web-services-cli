var Promise = require('bluebird');
var request = require('request');

var URL_BASE = 'http://localhost:8080';

var AUTH = {
	username: 'test',
	password: 'test'
};

function get(url, auth) {
	return new Promise(function(resolve, reject) {
		function getCallback(err, response, body) {
			if (!err) {
				resolve(body);
			}
			else {
				reject(err);
			}
		}

		request(url, getCallback).auth(auth.username, auth.password);
	});
}

module.exports = function(path) {
	path = path || '/api/jsonws';

	var url = URL_BASE + path;

	return get(url, AUTH);
};