#!/usr/bin/env node

var _ = require('lodash');
var Chance = require('chance');
var prettyjson = require('prettyjson');
var ProgressBar = require('progress');
var fs = require('fs');
var path = require('path');

var chance = new Chance();

module.exports = {
	// Registers all command files in the given category (subdirectory of './commands')  with Commander
	registerCommands: function(program, category) {
		var commandsPath = path.join(__dirname, './commands', category);
		var commandsList = fs.readdirSync(commandsPath);

		_.forEach(commandsList, function(command) {
			program = require(path.join(commandsPath, command))(program);
		});

		return program;
	}
}