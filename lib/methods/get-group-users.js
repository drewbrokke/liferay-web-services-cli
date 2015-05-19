var Method = require('../Method');

module.exports = function(groupId) {
	var payload = {
		groupId: groupId
	};

	console.log('payload: ', payload);

	var method = new Method('/user/get-group-users', payload);

	return method.invoke();
}