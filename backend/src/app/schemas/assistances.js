const pagination = require('./pagination');
const { isArray, isInteger } = require('../utils/lodash');
const { ASSISTANCE_TYPES } = require('../utils/constants');
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
  derivationTypeIdInBody,
  firstCallInBody,
  femicideRiskInBody,
  codBInBody
} = require('../errors/schema_messages');
const { addCommonProperties } = require('./common');
const { Assistance, ID } = require('../models');

exports.getAssistancesSchema = {
  ...authorization,
  ...pagination(Assistance)
};

exports.createAssistanceSchema = addCommonProperties(
  {
    ...authorization,
    phone_number: { in: ['body'], isString: true, trim: true, errorMessage: phoneNumberInBody },
    first_call: { in: ['body'], isBoolean: true, toBoolean: true, errorMessage: firstCallInBody },
    femicide_risk: { in: ['body'], isBoolean: true, toBoolean: true, errorMessage: femicideRiskInBody },
    cod_b: { in: ['body'], isBoolean: true, toBoolean: true, errorMessage: codBInBody },
    summary: { in: ['body'], isString: true, optional: true, trim: true },
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
    derivation_type_id: { in: ['body'], isNumeric: true, errorMessage: derivationTypeIdInBody },
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
      isOptional: true
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
    'call.aggressor.first_name': { in: ['body'], isString: true, trim: true, isOptional: true },
    'call.aggressor.last_name': { in: ['body'], isString: true, trim: true, isOptional: true },
    'call.aggressor.occupation': { in: ['body'], isString: true, trim: true, isOptional: true },
    'call.aggressor.identification_code': { in: ['body'], isString: true, trim: true, isOptional: true },
    'call.aggressor.identification_type_id': { in: ['body'], isNumeric: true, isOptional: true },
    'call.aggressor.city_id': { in: ['body'], isNumeric: true, isOptional: true },
    'call.representative.first_name': { in: ['body'], isString: true, trim: true, isOptional: true },
    'call.representative.last_name': { in: ['body'], isString: true, trim: true, isOptional: true },
    'call.vulnerable_population_id': { in: ['body'], isNumeric: true, isOptional: true },
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
