const app = require('./app');
const { check } = require('./migrations');
const config = require('./config');
const logger = require('./app/logger');

const port = config.common.api.port || 8080;

Promise.resolve()
  .then(() => check())
  .then(() => {
    app.listen(port);
    logger.info(`listening on port: ${port}`);
  })
  .catch(logger.error);
