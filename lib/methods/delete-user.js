var Method = require('../Method');

module.exports = function(userId) {
	var payload = {
		userId: userId
	};

	var method = new Method('/user/delete-user', payload);

	return method.invoke();
};