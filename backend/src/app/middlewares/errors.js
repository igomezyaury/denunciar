const errors = require('../errors/internal_codes');
const logger = require('../logger');

const DEFAULT_STATUS_CODE = 500;

const statusCodes = {
  [errors.INVALID_PARAMS]: 400,
  [errors.EMPTY_BODY]: 400,
  [errors.ALREADY_EXIST]: 409,
  [errors.INTERNAL_SERVER_ERROR]: 500,
  [errors.NOT_FOUND]: 404,
  [errors.INVALID_CREDENTIALS]: 401,
  [errors.INVALID_TOKEN]: 401,
  [errors.UNAUTHORIZED]: 401,
  [errors.BLOCKED_USER]: 403,
  [errors.DATABASE_ERROR]: 503
};

// eslint-disable-next-line no-unused-vars
exports.handle = (error, req, res, next) => {
  logger.error(error);
  res.status((error.internalCode && statusCodes[error.internalCode]) || DEFAULT_STATUS_CODE);
  return res.send({ message: error.message, internal_code: error.internalCode });
};
