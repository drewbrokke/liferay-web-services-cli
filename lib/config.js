#!/usr/bin/env node

var _ = require('lodash');
var fs = require('fs-extra');
var inquirer = require('inquirer');
var path = require('path');
var userhome = require('userhome');

var configFilePath = path.join(userhome(), '.lws.json');

function Instance(username, password, host, port, portalVersion) {
	this.username = username || 'test@liferay.com';
	this.password = password || 'test';
	this.host = host || 'localhost';
	this.port = port || '8080';
	this.portalVersion = portalVersion || 'master';

	return this;
}

// Reads the config file in the user's home folder
function getConfig() {
	return fs.readJSONSync(configFilePath);
}

// Writes to the config file in the user's home folder
function setConfig(config) {
	fs.writeJSONSync(configFilePath, config);
}

var config = getConfig();

// Deletes an instance configuration from the config file
module.exports.deleteInstanceConfig = function(instanceConfigName) {
	delete config.instances[instanceConfigName];

	setConfig(config);
}

// Returns the currently active instance configuration
module.exports.getCurrentInstanceConfig = function() {
	return module.exports.getInstanceConfig(config.currentInstance);
}

// Returns the name of of the currently active instance configuration
module.exports.getCurrentInstanceName = function() {
	return config.currentInstance;
}

// Returns a single instance configuration
module.exports.getInstanceConfig = function(configName) {
	return config.instances[configName];
}

// Returns an array of instance configuration names
module.exports.getInstanceConfigList = function() {
	return _.keys(config.instances);
}

// Returns all the instance configuration objects
module.exports.getInstanceConfigs = function() {
	return config.instances;
}

// Writes the default instance configuration to a config file in the user's home folder
module.exports.init = function() {
	var defaultInstance = new Instance();

	var configObject = {
		instances: {
			default: defaultInstance
		},
		currentInstance: 'default'
	};

	setConfig(configObject);
}

// Sets the active instance configuration
module.exports.setCurrentInstanceConfig = function(configName) {
	config.currentInstance = configName;

	setConfig(config);
}

// Writes an instance configuration to the config file
module.exports.setInstanceConfig = function(name, username, password, host, port, portalVersion) {
	var newInstance = new Instance(username, password, host, port, portalVersion);

	config.instances[name] = newInstance;

	setConfig(config);
}
