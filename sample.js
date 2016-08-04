var log = require('./index');

function doLog() {
	var error = new TypeError('a type error');
	log(error).error();
	log('this is an error').error();
	log('this is a warn').warn();
	log('this is an info').info();
	log('this is a verbose log').verbose();
	log('this is a debug log').debug();
	log('this is a silly log').silly();
}

console.info('---- log.config.level = ERROR (default)');
// log.config.level = 'error';
doLog();

console.info('---- log.config.level = WARN');
log.config.level = 'warn';
doLog();

console.info('---- log.config.level = INFO');
log.config.level = 'info';
doLog();

console.info('---- log.config.level = VERBOSE');
log.config.level = 'verbose';
doLog();

console.info('---- log.config.level = DEBUG');
log.config.level = 'debug';
doLog();

console.info('---- log.config.level = SILLY');
log.config.level = 'silly';
doLog();

console.info('---- log.config.show_date = false');
log.config.show_date = false;
doLog();

console.info('---- log.config.show_time = false');
log.config.show_time = false;
doLog();

console.info('---- log.config.show_type = false');
log.config.show_type = false;
doLog();

console.info('---- browser = false');
log.config.browser = false;
doLog();

console.info('---- browser = true');
log.config.browser = true;
doLog();

