#!/usr/bin/env node

var _ = require('lodash');
var fs = require('fs-extra');
var inquirer = require('inquirer');
var path = require('path');
var userhome = require('userhome');

var configFilePath = path.join(userhome(), '.lws.json');

var CONFIG_VERSION = "1";

function Instance(username, password, mailDomain, host, port) {
	this.username = username || 'test';
	this.password = password || 'test';
	this.mailDomain = mailDomain || 'liferay.com';
	this.host = host || 'localhost';
	this.port = port || '8080';

	return this;
}

// Writes to the config file in the user's home folder
function setConfig(config) {
	fs.writeJSONSync(configFilePath, config);
}

if (!fs.existsSync(configFilePath) ||
	fs.readJSONSync(configFilePath).instances === undefined) {

	var defaultInstance = new Instance();

	var configObject = {
		instances: {
			default: defaultInstance
		},
		currentInstance: 'default'
	};

	setConfig(configObject);
}

var config = fs.readJSONSync(configFilePath);
var currentInstanceConfig = config.instances[config.currentInstance];
var defaultInstanceConfig = config.instances['default'];

if (!currentInstanceConfig) {
	// Sets in preferences
	setCurrentInstanceConfig('default');

	// Sets local variable
	currentInstanceConfig = config.instances['default'];
}

function getInstanceConfig(configName) {
	return config.instances[configName];
}

// Sets the active instance configuration
function setCurrentInstanceConfig(configName) {
	config.currentInstance = configName;

	setConfig(config);
}

// Deletes an instance configuration from the config file
module.exports.deleteInstanceConfig = function(instanceConfigName) {
	delete config.instances[instanceConfigName];

	setConfig(config);
};

module.exports.getCurrentCompanyId = function() {
	var currentCompanyId = config.companyId;

	return Number(currentCompanyId);
};

module.exports.getCurrentMailDomain = function() {
	var currentMailDomain = currentInstanceConfig.mailDomain;

	return currentMailDomain;
};

// Returns the currently active instance configuration
module.exports.getCurrentInstanceConfig = function() {
	return currentInstanceConfig;
};

// Returns the name of of the currently active instance configuration
module.exports.getCurrentInstanceName = function() {
	return config.currentInstance;
};

// Returns a single instance configuration
module.exports.getInstanceConfig = function(configName) {
	return config.instances[configName];
};

// Returns an array of instance configuration names
module.exports.getInstanceConfigList = function() {
	return _.keys(config.instances);
};

// Returns all the instance configuration objects
module.exports.getInstanceConfigs = function() {
	return config.instances;
};

// Sets the companyId to be actively used
module.exports.setCurrentCompanyId = function(companyId) {
	config.companyId = companyId;

	setConfig(config);
};

module.exports.setCurrentInstanceConfig = setCurrentInstanceConfig;

// Writes an instance configuration to the config file
module.exports.setInstanceConfig = function(name, username, password, mailDomain, host, port) {
	var newInstance = new Instance(username, password, mailDomain, host, port);

	config.instances[name] = newInstance;

	setConfig(config);
};

//UPGRADE

// Upgrading config schemas
function upgrade() {
	console.log('Upgrading instance configurations...');

	var instances = config.instances;

	_.forEach(instances, function(instance, name) {
		if (instance.username.indexOf('@') != -1) {
			var parts = instance.username.split('@');

			instance.username = parts[0];
			instance.mailDomain = parts[1];
		}

		if (!!instance.portalVersion) {
			delete instance.portalVersion;
		}

		if (!!instance.companyId) {
			delete instance.companyId;
		}

		instances[name] = instance;
	});

	config.instances = instances;
	config.configVersion = CONFIG_VERSION;

	setConfig(config);

	console.log('Upgrade complete!');
}

// Returns true if schemas have already been upgraded
function isUpgraded() {
	return config.configVersion === CONFIG_VERSION;
}

module.exports.upgrade = upgrade;
module.exports.isUpgraded = isUpgraded;
