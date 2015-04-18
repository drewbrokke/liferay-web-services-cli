var utils = require('../utils');

var Action = utils.getActionClass();
var companyId = utils.getCurrentCompanyId();

module.exports = function(screenName, callback) {
	var payload = {
		companyId: companyId,
		screenName: screenName
	}

	var action = new Action('/user/get-user-by-screen-name', payload);

	action.doAction(callback);
}