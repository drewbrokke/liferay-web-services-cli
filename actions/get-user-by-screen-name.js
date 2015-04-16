var Action = require('../lib/actionClass');

module.exports = function(screenName, callback) {
	var payload = {
		companyId: 20152,
		screenName: screenName
	}

	var action = new Action('/user/get-user-by-screen-name', payload);

	action.doAction(callback);
}