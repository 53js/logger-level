# console-level

Simple console utility to display logs in console depending on log level.

## Installation

```sh
$ npm install logger-level
```

## Example usage

```js
const logger = require('logger-level');

// ...

logger.info('Hello World');
```

## API

### logger.error(str)
Type: `String` or `Object`

str is displayed on console only if log level is higher than 0 (ERROR).

If str has a stack property (such as Error object), then the error stacktrace is displayed on the console.

### logger.warn(str)
Type: `String` or `Object`

str is displayed on console only if log level is higher than 1 (WARN).

### logger.info(str)
Type: `String` or `Object`

str is displayed on console only if log level is higher than 2 (INFO).

### logger.verbose(str)
Type: `String` or `Object`

str is displayed on console only if log level is higher than 3 (VERBOSE).

### logger.debug(str)
Type: `String` or `Object`

str is displayed on console only if log level is higher than 4 (DEBUG).

### logger.silly(str)
Type: `String` or `Object`

str is displayed on console only if log level is higher than 5 (SILLY).

## Options

### logger.level
Type: `int`
Default: `0`

Sets log level.

Predefined values (log level in order of verbosity):

- logger.ERROR (0)
- logger.WARN (1)
- logger.INFO (2)
- logger.VERBOSE (3)
- logger.DEBUG (4)
- logger.SILLY (5)

Example:

```js
logger.level = logger.INFO;
```

### logger.show_date
Type: `Boolean`
Default: `true`

Displays the date on each log (format: YYYY/MM/DD).

Example:

```js
logger.show_date = false;
```

### logger.show_time
Type: `Boolean`
Default: `true`

Displays the time on each log (format: HH:MM:ss).

### logger.show_type
Type: `Boolean`
Default: `true`

Displays the colored type of log on each log.

  
