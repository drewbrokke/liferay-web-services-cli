var Action = require('../actionClassLoop');

module.exports = function(payload, callback) {
	var url = 'name=' + payload.name + '&comments=' + payload.description + '&type=' + payload.type;

	var action = new Action('/loop/divisions/add?', url);

	action.doAction(callback);
};