const pagination = require('./pagination');
const authorization = require('./authorizations');
const { USER_ROLES } = require('../utils/constants');
const {
  identificationCodeInBody,
  lastNameInBody,
  usernameInBody,
  firstNameInBody,
  identificationTypeIdInBody,
  birthDateInBody,
  emailInBody,
  passwordInBody,
  rolInBody
} = require('../errors/schema_messages');
const { addCommonProperties, OPTIONAL_ACTIVE, ID, ACTIVE } = require('./common');
const { User } = require('../models');

exports.getUsersSchema = {
  ...authorization,
  ...pagination(User)
};

exports.createUserSchema = addCommonProperties(
  {
    ...authorization,
    username: { in: ['body'], isString: true, trim: true, errorMessage: usernameInBody },
    first_name: { in: ['body'], isString: true, trim: true, errorMessage: firstNameInBody },
    last_name: { in: ['body'], isString: true, trim: true, errorMessage: lastNameInBody },
    identification_code: { in: ['body'], isString: true, trim: true, errorMessage: identificationCodeInBody },
    identification_type_id: { in: ['body'], isNumeric: true, errorMessage: identificationTypeIdInBody },
    birth_date: { in: ['body'], isISO8601: true, toDate: true, errorMessage: birthDateInBody },
    email: { in: ['body'], isString: true, trim: true, isEmail: true, errorMessage: emailInBody },
    password: { in: ['body'], isString: true, errorMessage: passwordInBody },
    rol: {
      in: ['body'],
      isString: true,
      optional: true,
      custom: { options: value => value === undefined || (value && Object.keys(USER_ROLES).includes(value)) },
      errorMessage: rolInBody
    }
  },
  [OPTIONAL_ACTIVE]
);

exports.getUserSchema = addCommonProperties(
  {
    ...authorization
  },
  [ID]
);

exports.updateUserSchema = addCommonProperties(
  {
    ...authorization,
    username: { in: ['body'], isString: true, trim: true, errorMessage: usernameInBody },
    first_name: { in: ['body'], isString: true, trim: true, errorMessage: firstNameInBody },
    last_name: { in: ['body'], isString: true, trim: true, errorMessage: lastNameInBody },
    identification_code: { in: ['body'], isString: true, trim: true, errorMessage: identificationCodeInBody },
    identification_type_id: { in: ['body'], isNumeric: true, errorMessage: identificationTypeIdInBody },
    birth_date: { in: ['body'], isISO8601: true, toDate: true, errorMessage: birthDateInBody },
    email: { in: ['body'], isString: true, trim: true, isEmail: true, errorMessage: emailInBody },
    rol: {
      in: ['body'],
      isString: true,
      custom: { options: value => value && Object.keys(USER_ROLES).includes(value) },
      errorMessage: rolInBody
    }
  },
  [ACTIVE, ID]
);

exports.deleteUserSchema = addCommonProperties(
  {
    ...authorization
  },
  [ID]
);
