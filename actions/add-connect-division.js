var Action = require('../actionClassConnect');

module.exports = function(payload, callback) {
	var url = 'name=' + payload.name + '&comments=' + payload.description + '&type=' + payload.type;

	var action = new Action('/connect/divisions/add?', url);

	action.doAction(callback);
};