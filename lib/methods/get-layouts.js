var Method = require('../Method');

module.exports = function(groupId) {
	var payload = {
		groupId: groupId,
		privateLayout: false
	};

	var method = new Method('/layout/get-layouts', payload);

	return method.invoke();
}