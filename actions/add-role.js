var Action = require('../actionClass');

module.exports = function(name, type, callback) {
	var role = {
		name: name,
		titleMap: JSON.stringify({
			"en_US": name
		}),
		descriptionMap: JSON.stringify({
			"en_US": name + " DESCRIPTION."
		}),
		type: type
	};

	var action = new Action('/role/add-role', role);

	action.doAction(callback);
}