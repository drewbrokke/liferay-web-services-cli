var utils = require('../utils');

var Method = utils.getMethodClass();
var host = utils.getCurrentHost();

module.exports = function(callback) {
	var payload = {
		virtualHost: host
	}

	var method = new Method('/company/get-company-by-virtual-host', payload);

	method.invoke(callback);
}