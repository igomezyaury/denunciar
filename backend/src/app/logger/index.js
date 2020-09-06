const logger = require('pino')({
  prettyPrint: {
    translateTime: true,
    colorize: true
  }
});

module.exports = logger;
