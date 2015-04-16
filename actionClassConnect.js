var request = require('request');
var utils = require('./lib/utils');

function Action(actionPath, url) {
	this.actionPath = 'http://test@liferay.com:test@localhost:8080/web/guest/connect/-' + actionPath + url;
}

Action.prototype.doAction = function(callback) {
	var payload = this.payload;

	try {
		if (!callback) {
			throw new Error('Missing callback function');
		}
		request.post(
			{
				url: this.actionPath,
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
};

module.exports = Action;