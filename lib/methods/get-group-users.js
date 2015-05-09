var Method = require('../Method');

module.exports = function(groupId, callback) {
	var payload = {
		groupId: groupId
	};

	console.log('payload: ', payload);

	var method = new Method('/user/get-group-users', payload);

	method.invoke(callback);
}