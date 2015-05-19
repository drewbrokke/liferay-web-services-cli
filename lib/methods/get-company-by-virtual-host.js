var Method = require('../Method');

module.exports = function(virtualHost) {
	var payload = {
		virtualHost: virtualHost
	};

	var method = new Method('/company/get-company-by-virtual-host', payload);

	return method.invoke();
}