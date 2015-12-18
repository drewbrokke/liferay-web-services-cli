#!/usr/bin/env node

var _ = require('lodash');

module.exports = {
	getMap: function(collection, srcKey, valueType) {
		var destinationMap = {};

		_.forEach(collection, function(item) {
			var destValue = item[valueType] || item;

			destinationMap[item[srcKey]] = destValue;
		});

		return destinationMap;
	}
};