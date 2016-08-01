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

logger.level = logger.ERROR;
log();

logger.level = logger.WARN;
log();

logger.level = logger.INFO;
log();

logger.level = logger.VERBOSE;
log();

logger.level = logger.DEBUG;
log();

logger.level = logger.SILLY;
log();

logger.show_date = false;
log();

logger.show_time = false;
log();

logger.show_type = false;
log();

