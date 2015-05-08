var Method = require('../Method');

module.exports = function(virtualHost, callback) {
	var payload = {
		virtualHost: virtualHost
	};

	var method = new Method('/company/get-company-by-virtual-host', payload);

	method.invoke(callback);
}