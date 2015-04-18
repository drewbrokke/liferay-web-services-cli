var utils = require('../utils');

var Action = utils.getActionClass();

module.exports = function(groupId, userIds, callback) {
	var groupUsers = {
		groupId: groupId,
		userIds: JSON.stringify(userIds)
	};

	var action = new Action('/user/add-group-users', groupUsers);

	action.doAction(callback);

}