const { authorizationInHeader } = require('../errors/schema_messages');

module.exports = {
  Authorization: {
    in: ['headers'],
    isJWT: true,
    trim: true,
    errorMessage: authorizationInHeader
  }
};
