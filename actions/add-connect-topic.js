var Action = require('../actionClassConnect');

module.exports = function(payload, callback) {
	var name = payload.name.replace(/\s/g, '');

	var description = encodeURIComponent(payload.description.slice(0, 200));

	var url = 'p_p_lifecycle=1&name=' + name + '&description=' + description;

	var action = new Action('/connect/topics/add?', url);

	action.doAction(callback);
};