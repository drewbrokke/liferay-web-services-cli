var Action = require('../actionClassConnect');

module.exports = function(payload, callback) {
	var url = 'name=' + payload.name + '&description=' + payload.description;

	var action = new Action('/connect/topics/add?', url);

	action.doAction(callback);
};