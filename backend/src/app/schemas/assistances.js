const pagination = require('./pagination');
const { isArray, isInteger } = require('../utils/lodash');
const { ASSISTANCE_TYPES, ASSISTANCE_CODES } = require('../utils/constants');
const authorization = require('./authorizations');
const {
  phoneNumberInBody,
  assistanceTypeInBody,
  victimFirstNameInBody,
  victimLastNameInBody,
  victimIdentificationCodeInBody,
  victimPhoneNumberInBody,
  victimAddressInBody,
  victimBirthDateInBody,
  victimAgeInBody,
  victimSexInBody,
  // eslint-disable-next-line id-length
  victimIdentificationTypeIdInBody,
  victimCityIdInBody,
  callIssueAddressInBody,
  callComplaintReasonIdInBody,
  callOriginTypeIdInBody,
  callViolenceTypesIdsInBody,
  derivationTypesIdsInBody,
  firstCallInBody,
  femicideRiskInBody,
  codeInBody,
  datetimeInBody,
  fromDateAssistanceInQuery,
  toDateAssistanceInQuery
} = require('../errors/schema_messages');
const { addCommonProperties, ID } = require('./common');
const { Assistance } = require('../models');

exports.getAssistancesSchema = {
  ...authorization,
  ...pagination(Assistance)
};

exports.createAssistanceSchema = addCommonProperties(
  {
    ...authorization,
    'aggressor.aggressor_city_id': { in: ['body'], isNumeric: true, optional: true },
    'aggressor.aggressor_first_name': { in: ['body'], isString: true, trim: true, optional: true },
    'aggressor.aggressor_identification_code': { in: ['body'], isString: true, trim: true, optional: true },
    'aggressor.aggressor_identification_type_id': { in: ['body'], isNumeric: true, optional: true },
    'aggressor.aggressor_last_name': { in: ['body'], isString: true, trim: true, optional: true },
    'aggressor.aggressor_occupation': { in: ['body'], isString: true, trim: true, optional: true },
    'complaint.code': {
      in: ['body'],
      isString: true,
      errorMessage: codeInBody,
      custom: {
        options: value => value && Object.values(ASSISTANCE_CODES).includes(value.toLowerCase())
      }
    },
    'complaint.complaint_reason_id': {
      in: ['body'],
      isNumeric: true,
      errorMessage: callComplaintReasonIdInBody
    },
    'complaint.derivation_observation': { in: ['body'], isString: true, optional: true, trim: true },
    'complaint.derivation_types': {
      in: ['body'],
      custom: {
        options: value => value && value.length && isArray(value) && value.every(isInteger)
      },
      errorMessage: derivationTypesIdsInBody
    },
    'complaint.issue_address': {
      in: ['body'],
      isString: true,
      optional: true,
      trim: true,
      errorMessage: callIssueAddressInBody
    },
    'complaint.origin_type_id': { in: ['body'], isNumeric: true, errorMessage: callOriginTypeIdInBody },
    'complaint.violence_types': {
      in: ['body'],
      custom: {
        options: value => value && value.length && isArray(value) && value.every(isInteger)
      },
      errorMessage: callViolenceTypesIdsInBody
    },
    'complaint.vulnerable_population_id': { in: ['body'], isNumeric: true, optional: true },
    'general.assistance_type': {
      in: ['body'],
      errorMessage: assistanceTypeInBody,
      isString: true,
      trim: true,
      custom: {
        options: value => value && Object.keys(ASSISTANCE_TYPES).includes(value.toUpperCase())
      }
    },
    'general.date_time': { in: ['body'], isISO8601: true, toDate: true, errorMessage: datetimeInBody },
    'general.femicide_risk': {
      in: ['body'],
      isBoolean: true,
      toBoolean: true,
      errorMessage: femicideRiskInBody
    },
    'general.first_call': { in: ['body'], isBoolean: true, toBoolean: true, errorMessage: firstCallInBody },
    'general.phone_number': { in: ['body'], isString: true, trim: true, errorMessage: phoneNumberInBody },
    'general.summary': { in: ['body'], isString: true, optional: true, trim: true },
    'person.address': { in: ['body'], isString: true, trim: true, errorMessage: victimAddressInBody },
    'person.age': { in: ['body'], isNumeric: true, optional: true, errorMessage: victimAgeInBody },
    'person.birth_date': {
      in: ['body'],
      isISO8601: true,
      toDate: true,
      optional: true,
      errorMessage: victimBirthDateInBody
    },
    'person.city_id': { in: ['body'], isNumeric: true, errorMessage: victimCityIdInBody },
    'person.disabilities': {
      in: ['body'],
      custom: {
        options: value => !value || (isArray(value) && value.every(isInteger))
      }
    },
    'person.first_name': { in: ['body'], isString: true, trim: true, errorMessage: victimFirstNameInBody },
    'person.identification_code': {
      in: ['body'],
      isString: true,
      trim: true,
      errorMessage: victimIdentificationCodeInBody
    },
    'person.identification_type_id': {
      in: ['body'],
      isNumeric: true,
      errorMessage: victimIdentificationTypeIdInBody
    },
    'person.last_name': { in: ['body'], isString: true, trim: true, errorMessage: victimLastNameInBody },
    'person.phone_number': {
      in: ['body'],
      isString: true,
      trim: true,
      errorMessage: victimPhoneNumberInBody
    },
    'person.relationship_type_id': { in: ['body'], isNumeric: true, trim: true, optional: true },
    'person.representative_first_name': { in: ['body'], isString: true, trim: true, optional: true },
    'person.representative_last_name': { in: ['body'], isString: true, trim: true, optional: true },
    'person.representative_type_id': { in: ['body'], isNumeric: true, trim: true, optional: true },
    'person.sex': { in: ['body'], isString: true, trim: true, optional: true, errorMessage: victimSexInBody },
    'person.sex_clarification': {
      in: ['body'],
      isString: true,
      trim: true,
      optional: true
    }
  },
  []
);

exports.getAssistanceSchema = addCommonProperties(
  {
    ...authorization
  },
  [ID]
);

exports.deleteAssistanceSchema = addCommonProperties(
  {
    ...authorization
  },
  [ID]
);

exports.updateAssistanceSchema = addCommonProperties(
  {
    ...this.createAssistanceSchema
  },
  [ID]
);

exports.dateAssistanceSchema = {
  from_date: {
    in: ['query'],
    isISO8601: true,
    toDate: true,
    errorMessage: fromDateAssistanceInQuery,
    optional: true
  },
  to_date: {
    in: ['query'],
    isISO8601: true,
    toDate: true,
    errorMessage: toDateAssistanceInQuery,
    optional: true
  }
};
