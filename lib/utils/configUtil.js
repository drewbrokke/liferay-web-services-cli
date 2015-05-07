#!/usr/bin/env node

module.exports = {
	getConfig: function() {
		return require('./config');
	},

	getCurrentCompanyId: function() {
		var currentInstanceConfig = this.getConfig().getCurrentInstanceConfig().companyId || 20152;

		return currentInstanceConfig;
	},

	getCurrentHost: function() {
		var currentHost = this.getConfig().getCurrentInstanceConfig().host || 'localhost';

		return currentHost;
	}
}