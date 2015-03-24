var superb = require('superb');
var Action = require('../actionClass');

module.exports = function(program, callback) {
	var type = (0 < program.type < 4) ? program.type : 1;
	var typeLabel = getTypeLabel(type);

	var name = program.rolenamename || (superb().toUpperCase() + typeLabel);

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

	function getTypeLabel(type) {
		if (type === 1) {
			return " Regular Role";
		}
		else if (type === 2) {
			return " Site Role";
		}
		else if (type === 3) {
			return " Organization Role";
		}
		else {
			return " Role";
		}
	}

	var action = new Action('/role/add-role', role);

	action.doAction(callback);
}