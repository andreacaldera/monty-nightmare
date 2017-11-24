const winston = require('winston');

winston.addColors({
  silly: 'magenta',
  debug: 'blue',
  verbose: 'cyan',
  info: 'green',
  warn: 'yellow',
  error: 'red',
});

winston.remove(winston.transports.Console);
winston.add(winston.transports.Console, {
  level: process.env.LOG_LEVEL,
  prettyPrint: true,
  colorize: true,
  silent: false,
  timestamp: false,
});

winston.performanceLogging = (start) => {
  const time = new Date() - start;
  if (time > 10000) {
    winston.error(`Page load took ${time} ms`);
  } else if (time > 5000) {
    winston.warn(`Page load took ${time} ms`);
  } else if (time > 1000) {
    winston.info(`Page load took ${time} ms`);
  } else {
    winston.debug(`Page load took ${time} ms`);
  }
};

module.exports = winston;
