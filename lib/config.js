#!/usr/bin/env node

var path = require('path');
var userhome = require('userhome');
var fs = require('fs-extra');
var inquirer = require('inquirer');
var _ = require('lodash');

var configFilePath = path.join(userhome(), '.lws.json');

function Instance(username, password, domain, port, portalVersion) {
	this.username = username || 'test@liferay.com';
	this.password = password || 'test';
	this.domain = domain || 'localhost';
	this.port = port || '8080';
	this.portalVersion = portalVersion || 'master';

	return this;
}

function getConfig() {
	return fs.readJSONSync(configFilePath);
}

function setConfig(config) {
	fs.writeJSONSync(configFilePath, config);
}

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

module.exports.getActiveInstanceName = function() {
	var config = getConfig();

	return config.currentInstance;
}

// Returns an array of instance config names
module.exports.getInstanceConfigList = function() {
	var config = getConfig();

	return _.keys(config.instances);
}

module.exports.getInstanceConfigs = function() {
	var config = getConfig();

	return config.instances;
}

module.exports.getInstanceConfig = function(configName) {
	var config = getConfig();

	return config.instances[configName];
}

module.exports.getActiveInstanceConfig = function() {
	var config = getConfig();

	return module.exports.getInstanceConfig(config.currentInstance);
}

module.exports.setActiveInstanceConfig = function(configName) {
	var config = getConfig();

	config.currentInstance = configName;

	setConfig(config);
}

module.exports.setInstanceConfig = function(name, username, password, domain, port, portalVersion) {
	var config = getConfig();
	var newInstance = new Instance(username, password, domain, port, portalVersion);

	config.instances[name] = newInstance;

	setConfig(config);
}

module.exports.deleteInstanceConfig = function(instanceConfigName) {
	var config = getConfig();

	delete config.instances[instanceConfigName];

	setConfig(config);
}





