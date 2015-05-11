var Method = require('../Method');

module.exports = function(userId, callback) {
	var payload = {
		userId: userId
	};

	var method = new Method('/user/delete-user', payload);

	method.invoke(callback);
}