var Method = require('../Method');

module.exports = function(screenName, companyId, callback) {
	var payload = {
		companyId: companyId,
		screenName: screenName
	};

	var method = new Method('/user/get-user-by-screen-name', payload);

	method.invoke(callback);
}