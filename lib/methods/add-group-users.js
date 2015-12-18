var Method = require('../Method');

module.exports = function(groupId, userIds) {
	var groupUsers = {
		groupId: groupId,
		userIds: JSON.stringify(userIds)
	};

	var method = new Method('/user/add-group-users', groupUsers);

	return method.invoke();
};