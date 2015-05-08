var Method = require('../Method');

module.exports = function(userId, companyId, callback) {
	// companyId is not used

	var payload = {
		userId: userId
	};

	var method = new Method('/user/get-user-by-id', payload);

	method.invoke(callback);
}