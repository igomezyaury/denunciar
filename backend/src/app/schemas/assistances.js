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
  datetimeInBody
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
    phone_number: { in: ['body'], isString: true, trim: true, errorMessage: phoneNumberInBody },
    datetime: { in: ['body'], isISO8601: true, toDate: true, errorMessage: datetimeInBody },
    first_call: { in: ['body'], isBoolean: true, toBoolean: true, errorMessage: firstCallInBody },
    femicide_risk: {in: ['body'], isBoolean: true, toBoolean: true, errorMessage: femicideRiskInBody},
    code: {
      in: ['body'],
      isString: true,
      errorMessage: codeInBody,
      custom: {
        options: value => value && Object.values(ASSISTANCE_CODES).includes(value.toLowerCase())
      }
    },
    summary: {in: ['body'], isString: true, optional: true, trim: true},
    derivation_observation: { in: ['body'], isString: true, optional: true, trim: true },
    assistance_type: {
      in: ['body'],
      errorMessage: assistanceTypeInBody,
      isString: true,
      trim: true,
      custom: {
        options: value => value && Object.keys(ASSISTANCE_TYPES).includes(value.toUpperCase())
      }
    },
    derivation_types: {
      in: ['body'],
      custom: {
        options: value => value && value.length && isArray(value) && value.every(isInteger)
      },
      errorMessage: derivationTypesIdsInBody
    },
    'victim.first_name': { in: ['body'], isString: true, trim: true, errorMessage: victimFirstNameInBody },
    'victim.last_name': { in: ['body'], isString: true, trim: true, errorMessage: victimLastNameInBody },
    'victim.identification_code': {
      in: ['body'],
      isString: true,
      trim: true,
      errorMessage: victimIdentificationCodeInBody
    },
    'victim.phone_number': {
      in: ['body'],
      isString: true,
      trim: true,
      errorMessage: victimPhoneNumberInBody
    },
    'victim.address': { in: ['body'], isString: true, trim: true, errorMessage: victimAddressInBody },
    'victim.birth_date': { in: ['body'], isISO8601: true, toDate: true, errorMessage: victimBirthDateInBody },
    'victim.age': { in: ['body'], isNumeric: true, errorMessage: victimAgeInBody },
    'victim.sex': { in: ['body'], isString: true, trim: true, errorMessage: victimSexInBody },
    'victim.sex_clarification': {
      in: ['body'],
      isString: true,
      trim: true,
      optional: true
    },
    'victim.identification_type_id': {
      in: ['body'],
      isNumeric: true,
      errorMessage: victimIdentificationTypeIdInBody
    },
    'victim.city_id': { in: ['body'], isNumeric: true, errorMessage: victimCityIdInBody },
    'victim.disabilities': {
      in: ['body'],
      custom: {
        options: value => !value || (isArray(value) && value.every(isInteger))
      }
    },
    'call.issue_address': { in: ['body'], isString: true, trim: true, errorMessage: callIssueAddressInBody },
    'call.aggressor.first_name': { in: ['body'], isString: true, trim: true, optional: true },
    'call.aggressor.last_name': { in: ['body'], isString: true, trim: true, optional: true },
    'call.aggressor.occupation': { in: ['body'], isString: true, trim: true, optional: true },
    'call.aggressor.identification_code': { in: ['body'], isString: true, trim: true, optional: true },
    'call.aggressor.identification_type_id': { in: ['body'], isNumeric: true, optional: true },
    'call.aggressor.city_id': { in: ['body'], isNumeric: true, optional: true },
    'call.representative.first_name': { in: ['body'], isString: true, trim: true, optional: true },
    'call.representative.last_name': { in: ['body'], isString: true, trim: true, optional: true },
    'call.vulnerable_population_id': { in: ['body'], isNumeric: true, optional: true },
    'call.complaint_reason_id': { in: ['body'], isNumeric: true, errorMessage: callComplaintReasonIdInBody },
    'call.violence_types': {
      in: ['body'],
      custom: {
        options: value => value && value.length && isArray(value) && value.every(isInteger)
      },
      errorMessage: callViolenceTypesIdsInBody
    },
    'call.origin_type_id': { in: ['body'], isNumeric: true, errorMessage: callOriginTypeIdInBody }
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
