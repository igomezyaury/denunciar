const logger = require('pino')({
  level: 'debug',
  prettyPrint: {
    translateTime: true,
    colorize: true
  }
});

module.exports = logger;
