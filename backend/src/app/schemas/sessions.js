const authorization = require('./authorizations');
const { emailInBody, passwordInBody, refreshTokenInBody } = require('../errors/schema_messages');

exports.loginSchema = {
  email: { in: ['body'], isString: true, trim: true, isEmail: true, errorMessage: emailInBody },
  password: { in: ['body'], isString: true, errorMessage: passwordInBody }
};

exports.refreshSchema = {
  ...authorization,
  refresh_token: {
    in: ['body'],
    isJWT: true,
    trim: true,
    errorMessage: refreshTokenInBody
  }
};

exports.logoutSchema = {
  ...authorization
};
