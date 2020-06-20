const {
  INVALID_PARAMS,
  EMPTY_BODY,
  ALREADY_EXIST,
  INTERNAL_SERVER_ERROR,
  DATABASE_ERROR,
  NOT_FOUND,
  INVALID_CREDENTIALS,
  INVALID_TOKEN,
  UNAUTHORIZED,
  BLOCKED_USER
} = require('./internal_codes');

const buildError = (message, internalCode) => ({
  message,
  internalCode
});

exports.invalidParams = arrayErrors => buildError(arrayErrors, INVALID_PARAMS);
exports.nonEmptyBody = buildError("The body mustn't be empty", EMPTY_BODY);
exports.alreadyExist = message => buildError(message, ALREADY_EXIST);
exports.internalServerError = message =>
  buildError(`There was an unexpected error, reason: ${message}`, INTERNAL_SERVER_ERROR);
exports.databaseError = message => buildError(message, DATABASE_ERROR);
exports.notFound = message => buildError(message, NOT_FOUND);
exports.invalidCredentials = () => buildError('The credentials are not correct', INVALID_CREDENTIALS);
exports.invalidToken = message => buildError(message, INVALID_TOKEN);
exports.unauthorized = () =>
  buildError('The provided user is not authorized to access the resource', UNAUTHORIZED);
exports.blockedUser = () =>
  buildError('The provided user has been blocked because of many login attempts', BLOCKED_USER);
