var Method = require('../Method');

module.exports = function(groupId, callback) {
	var payload = {
		groupId: groupId,
		privateLayout: false
	};

	var method = new Method('/layout/get-layouts', payload);

	method.invoke(callback);
}