var logger = require('./index');

function log() {
	var error = new TypeError('a type error');
	logger.error(error);
	logger.error('this is an error');
	logger.warn('this is a warn');
	logger.info('this is an info');
	logger.verbose('this is a verbose log');
	logger.debug('this is a debug log');
	logger.silly('this is a silly log');
}

console.info('----logger.level = logger.ERROR');
logger.level = logger.ERROR;
log();

console.info('----logger.level = logger.WARN');
logger.level = logger.WARN;
log();

console.info('----logger.level = logger.INFO');
logger.level = logger.INFO;
log();

console.info('----logger.level = logger.VERBOSE');
logger.level = logger.VERBOSE;
log();

console.info('----logger.level = logger.DEBUG');
logger.level = logger.DEBUG;
log();

console.info('----logger.level = logger.SILLY');
logger.level = logger.SILLY;
log();

console.info('----show_date = false');
logger.show_date = false;
log();

console.info('----show_time = false');
logger.show_time = false;
log();

console.info('----show_type = false');
logger.show_type = false;
log();

console.info('---- browser = false');
logger.browser = false;
log();

console.info('---- browser = true');
logger.browser = true;
log();

