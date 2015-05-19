var Method = require('../Method');

module.exports = function(userId, roleIds) {
	var userRole = {
		userId: userId,
		roleIds: JSON.stringify(roleIds)
	};

	var method = new Method('/role/add-user-roles', userRole);

	return method.invoke();

}