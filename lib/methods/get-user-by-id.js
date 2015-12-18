var Method = require('../Method');

module.exports = function(userId, companyId) {
	// companyId is not used

	var payload = {
		userId: userId
	};

	var method = new Method('/user/get-user-by-id', payload);

	return method.invoke();
};