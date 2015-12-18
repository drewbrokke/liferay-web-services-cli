var Method = require('../Method');

module.exports = function(mailDomain) {
	var payload = {
		mx: mailDomain
	};

	var method = new Method('/company/get-company-by-mx', payload);

	return method.invoke();
};