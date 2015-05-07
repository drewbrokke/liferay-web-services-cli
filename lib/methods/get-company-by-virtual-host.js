var Method = require('../Method');
var host = require('../utils/configUtil').getCurrentHost();

module.exports = function(callback) {
	var payload = {
		virtualHost: host
	}

	var method = new Method('/company/get-company-by-virtual-host', payload);

	method.invoke(callback);
}