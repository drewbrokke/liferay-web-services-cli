var Method = require('../Method');

module.exports = function(userId, callback) {
	var payload = {
		userId: userId
	}

	var method = new Method('/user/get-user-by-id', payload);

	method.invoke(callback);
}