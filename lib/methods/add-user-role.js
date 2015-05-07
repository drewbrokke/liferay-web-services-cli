var Method = require('../Method');

module.exports = function(userId, roleIds, callback) {
	var userRole = {
		userId: userId,
		roleIds: JSON.stringify(roleIds)
	};

	var method = new Method('/role/add-user-roles', userRole);

	method.invoke(callback);

}