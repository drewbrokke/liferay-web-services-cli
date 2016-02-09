var _ = require('lodash');
var fs = require('fs-extra');
var path = require('path');
var userhome = require('userhome');

function ServiceMethodCache(version) {
	this.path = path.join(userhome(), '.lws', 'cache', version + '.json');

	fs.ensureFileSync(this.path);

	this.cache = {};

	try {
		this.cache = fs.readJSONSync(this.path);
	}
	catch(e) {
	}
}

ServiceMethodCache.prototype = {

	cacheServiceMethodsList: function(context, service, serviceMethodsList) {
		_.set(this.cache, [context, 'methods', service], serviceMethodsList);

		this.update();
	},

	cacheServicesList: function(context, servicesList) {
		_.set(this.cache, [context, 'services'], servicesList);

		this.update();
	},

	clearCache: function() {
		fs.writeJSONSync(this.path, {});
	},

	getServiceMethodsList: function(context, service) {
		return _.get(this.cache, [context, 'methods', service], []);
	},

	getServicesList: function(context) {
		return _.get(this.cache, [context, 'services'], []);
	},

	update: function() {
		fs.writeJSONSync(this.path, this.cache);
	}

};

module.exports = ServiceMethodCache;