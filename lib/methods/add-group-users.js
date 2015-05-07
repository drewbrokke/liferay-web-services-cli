var Method = require('../Method');

module.exports = function(groupId, userIds, callback) {
	var groupUsers = {
		groupId: groupId,
		userIds: JSON.stringify(userIds)
	};

	var method = new Method('/user/add-group-users', groupUsers);

	method.invoke(callback);

}