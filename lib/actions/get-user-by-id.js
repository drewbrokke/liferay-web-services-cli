var utils = require('../utils');

var Action = utils.getActionClass();

module.exports = function(userId, callback) {
	var payload = {
		userId: userId
	}

	var action = new Action('/user/get-user-by-id', payload);

	action.doAction(callback);
}