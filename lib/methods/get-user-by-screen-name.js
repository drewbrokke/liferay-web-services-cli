var utils = require('../utils');

var Method = utils.getMethodClass();
var companyId = utils.getCurrentCompanyId();

module.exports = function(screenName, callback) {
	var payload = {
		companyId: companyId,
		screenName: screenName
	}

	var method = new Method('/user/get-user-by-screen-name', payload);

	method.invoke(callback);
}