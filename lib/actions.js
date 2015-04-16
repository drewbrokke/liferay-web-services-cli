#!/usr/bin/env node

var _ = require('lodash');
var fs = require('fs');
var path = require('path');

var actions = {};
var actionFileList = fs.readdirSync(path.join(__dirname, '../actions'));

function indexAction(fileName) {
	var action = require(path.join(__dirname, '../actions', fileName));

	var actionName = _.camelCase(fileName.replace('.js', ''));

	actions[actionName] = action;
}

_.forEach(actionFileList, indexAction);

module.exports = actions;