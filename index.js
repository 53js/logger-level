'use strict';

const logger = {
	set level(lvl) {
		if (typeof lvl === 'string') {
			lvl = lvl.toLowerCase();
			switch (lvl) {
			case 'error': lvl = logger.ERROR; break;
			case 'warn': lvl = logger.WARN; break;
			case 'info': lvl = logger.INFO; break;
			case 'verbose': lvl = logger.VERBOSE; break;
			case 'debug': lvl = logger.DEBUG; break;
			case 'silly': lvl = logger.SILLY; break;
			default: lvl = logger.ERROR;
			}
		}
		logger.log_level = lvl;
	},

	get level() {
		switch (logger.log_level) {
		case logger.ERROR: return 'error';
		case logger.WARN: return 'warn';
		case logger.info: return 'info';
		case logger.VERBOSE: return 'verbose';
		case logger.DEBUG: return 'debug';
		case logger.SILLY: return 'silly';
		default: return undefined;
		}
	},

	set browser(bool) {
		logger.show_date =
			logger.show_time =
				logger.show_type = !bool;
	},

	/* eslint-disable no-use-before-define */
	get error() {
		if (logger.log_level >= logger.ERROR) {
			return log.bind(this, console.error.bind(console), logger.ERROR);
		}
		return reject;
	},

	get warn() {
		if (logger.log_level >= logger.WARN) {
			return log.bind(this, console.warn.bind(console), logger.WARN);
		}
		return reject;
	},

	get info() {
		if (logger.log_level >= logger.INFO) {
			return log.bind(this, console.info.bind(console), logger.INFO);
		}
		return reject;
	},

	get verbose() {
		if (logger.log_level >= logger.VERBOSE) {
			return log.bind(this, console.log.bind(console), logger.VERBOSE);
		}
		return reject;
	},

	get debug() {
		if (logger.log_level >= logger.DEBUG) {
			return log.bind(this, console.log.bind(console), logger.DEBUG);
		}
		return reject;
	},

	get silly() {
		if (logger.log_level >= logger.SILLY) {
			return log.bind(this, console.log.bind(console), logger.SILLY);
		}
		return reject;
	}
	/* eslint-enable no-use-before-define */
};

logger.ERROR = 0;
logger.WARN = 1;
logger.INFO = 2;
logger.VERBOSE = 3;
logger.DEBUG = 4; // Error stacktrace displayed at this level
logger.SILLY = 5;

logger.log_level = logger.ERROR;
logger.show_date = true;
logger.show_time = true;
logger.show_type = true;

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

function getTypeString(type) {
	let result = '';
	switch (type) {
	case logger.ERROR:
		result = '\u001b[31;1m[error]\u001b[39;0m';
		break;
	case logger.WARN:
		result = '\u001b[33;1m[warn]\u001b[39;0m ';
		break;
	case logger.INFO:
		result = '\u001b[34;1m[info]\u001b[39;0m ';
		break;
	case logger.VERBOSE:
		result = '[verb] ';
		break;
	case logger.DEBUG:
		result = '[debug]';
		break;
	case logger.SILLY:
		result = '[silly]';
		break;
	default:
		break;
	}
	return result;
}

function getPrefixString(type) {
	let result = '';
	if (logger.show_date) {
		result += getDateString() + ' ';
	}
	if (logger.show_time) {
		result += getTimeString() + ' ';
	}
	if (logger.show_type) {
		result += getTypeString(type) + ' ';
	}
	return result;
}

function getFullLog(type, args) {
	let str = args[0];
	args = args.slice(1);
	let prefixString = getPrefixString(type);
	str = (type === logger.ERROR && str && str.stack) ?
			str.stack :
			str;
	let result = [];
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

function reject() {}

function log(consoleFunc, type) {
	return consoleFunc.apply(console,
		getFullLog(type, Array.prototype.slice.call(arguments, 2)));
}

module.exports = exports = logger;
