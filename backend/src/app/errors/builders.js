const { INVALID_PARAMS, EMPTY_BODY } = require('./internal_codes');

const buildError = (message, internalCode) => ({
  message,
  internalCode
});

exports.invalidParams = arrayErrors => buildError(arrayErrors, INVALID_PARAMS);
exports.nonEmptyBody = buildError("The body mustn't be empty", EMPTY_BODY);
