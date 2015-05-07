var Method = require('../Method');
var companyId = require('../utils/configUtil').getCurrentCompanyId();

module.exports = function(screenName, callback) {
	var payload = {
		companyId: companyId,
		screenName: screenName
	}

	var method = new Method('/user/get-user-by-screen-name', payload);

	method.invoke(callback);
}