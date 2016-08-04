'use strict';

var LEVEL = [
	['ERROR', 0, console.error, 'error'],
	['WARN', 1, console.warn, 'warn'],
	['INFO', 2, console.info, 'info'],
	['VERBOSE', 3, console.log, 'verbose'],
	['DEBUG', 4, console.log, 'debug'], // Error stacktrace displayed at this level
	['SILLY', 5, console.log, 'silly']
];

var config = {};

config.log_level = LEVEL[0];
config.show_date = true;
config.show_time = true;
config.show_type = true;

Object.defineProperty(config, 'level', {
	get: function level() {
		return this.log_level;
	},
	set: function level(lvl) {
		if (typeof lvl === 'string') {
			lvl = lvl.toLowerCase();
			lvl = LEVEL.find(function each(l) {
				return l[3] === lvl;
			});
		}
		this.log_level = lvl;
	}
});

Object.defineProperty(config, 'browser', {
	set: function browser(bool) {
		this.show_date =
			this.show_time =
				this.show_type = !bool;
	}
});

function getDateString() {
	var date = new Date();
	return date.getFullYear() + '/' +
		('0' + date.getMonth()).slice(-2) + '/' +
		('0' + date.getDate()).slice(-2);
}

function getTimeString() {
	var date = new Date();
	return ('0' + date.getHours()).slice(-2) + ':' +
		('0' + date.getMinutes()).slice(-2) + ':' +
		('0' + date.getSeconds()).slice(-2);
}

function getTypeString(level) {
	var result = '';
	switch (level[0]) {
	case 'ERROR':
		result = '\u001b[31;1m[error]\u001b[39;0m';
		break;
	case 'WARN':
		result = '\u001b[33;1m[warn]\u001b[39;0m ';
		break;
	case 'INFO':
		result = '\u001b[34;1m[info]\u001b[39;0m ';
		break;
	case 'VERBOSE':
		result = '[verb] ';
		break;
	case 'DEBUG':
		result = '[debug]';
		break;
	case 'SILLY':
		result = '[silly]';
		break;
	default:
		break;
	}
	return result;
}

function getPrefixString(level) {
	var result = '';
	if (config.show_date) {
		result += getDateString() + ' ';
	}
	if (config.show_time) {
		result += getTimeString() + ' ';
	}
	if (config.show_type) {
		result += getTypeString(level) + ' ';
	}
	return result;
}

function getFullLog(level, args) {
	var str = args[0];
	var prefixString = getPrefixString(level);
	var result = [];
	args = args.slice(1);
	str = (level[0] === LEVEL[0][0] && str && str.stack) ?
			str.stack :
			str;
	if (prefixString) {
		result.push(prefixString);
	}
	if (result.length && typeof str === 'string') {
		result[0] = (result[0] || '') + str;
	} else {
		result.push(str);
	}
	result = result.concat(args);
	return result;
}

function reject() {
	return function cancel() {};
}

function getLoggers(args) {
	var logger = {};
	LEVEL.forEach(function each(level) {
		Object.defineProperty(logger, level[3], {
			get: function get() {
				if (config.level[1] >= level[1]) {
					return Function.prototype.bind.apply(level[2],
						[console].concat(getFullLog(level, args)));
				}
				return reject;
			}
		});
	});
	return logger;
}

function log() {
	var args = Array.prototype.slice.call(arguments);
	return getLoggers(args);
}

module.exports = exports = log;
exports.config = config;
