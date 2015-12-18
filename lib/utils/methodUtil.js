#!/usr/bin/env node

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

module.exports = {
	getMethods: function() {
		var methods = {};
		var methodDirPath = path.join(__dirname, '../methods');
		var methodFileList = fs.readdirSync(methodDirPath);

		function indexAction(fileName) {
			var method = require(path.join(methodDirPath, fileName));

			var methodName = _.camelCase(fileName.replace('.js', ''));

			methods[methodName] = method;
		}

		_.forEach(methodFileList, indexAction);

		return methods;
	},

	getMethodRouters: function() {
		var methodRouters = {};
		var methodRouterFileList = fs.readdirSync(path.join(__dirname, '../method-routers'));

		function indexAction(fileName) {
			var methodRouter = require(path.join(__dirname, '../method-routers', fileName));

			var methodRouterName = _.camelCase(fileName.replace('.js', ''));

			methodRouters[methodRouterName] = methodRouter;
		}

		_.forEach(methodRouterFileList, indexAction);

		return methodRouters;
	}
};