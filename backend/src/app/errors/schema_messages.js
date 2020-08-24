const integerMessage = field => `${field} must be an integer`;
const containedMessage = location => `and be contained in ${location}`;
const stringMessage = field => `${field} must be a string`;
const booleanMessage = field => `${field} must be a boolean`;
const dateMessage = field => `${field} must be a date (YYYY-MM-DD)`;
const jwtMessage = (field, location = 'headers') =>
  `${field} must be a jwt token and must be contained in ${location}`;
const tokenMessage = field => `${field} must be a jwt token`;
const arrayMessage = field => `${field} must be an array`;

exports.orderSense = `order_sense must be asc o desc ${containedMessage('query')}`;
exports.orderColumn = `order_column must be a valid column ${containedMessage('query')}`;
exports.pageNumber = `${integerMessage('page_number')}, be greater than zero ${containedMessage('query')}`;
exports.pageSize = `${integerMessage('page_size')}, be greater than zero ${containedMessage('query')}`;
exports.idInPath = `${integerMessage('id')} ${containedMessage('path')}`;
exports.nameInBody = `${stringMessage('name')} ${containedMessage('body')}`;
exports.activeInBody = `${booleanMessage('active')} ${containedMessage('body')}`;
exports.usernameInBody = `${stringMessage('username')} ${containedMessage('body')}`;
exports.firstNameInBody = `${stringMessage('first_name')} ${containedMessage('body')}`;
exports.lastNameInBody = `${stringMessage('last_name')} ${containedMessage('body')}`;
exports.identificationCodeInBody = `${stringMessage('identification_code')} ${containedMessage('body')}`;
exports.birthDateInBody = `${dateMessage('birth_date')} ${containedMessage('body')}`;
exports.emailInBody = `${stringMessage('email')} ${containedMessage('body')}`;
exports.passwordInBody = `${stringMessage('password')} ${containedMessage('body')}`;
exports.oldPasswordInBody = `${stringMessage('old_password')} ${containedMessage('body')}`;
exports.newPasswordInBody = `${stringMessage('new_password')} ${containedMessage('body')}`;
exports.identificationTypeIdInBody = `${integerMessage('identification_type_id')} ${containedMessage(
  'body'
)}`;
exports.authorizationInHeader = jwtMessage('Authorization');
exports.refreshTokenInBody = `${tokenMessage('refresh_token')} ${containedMessage('body')}`;
exports.rolInBody = `${stringMessage('rol')}, must be one of 'normal' or 'admin' ${containedMessage('body')}`;
exports.phoneNumberInBody = `${stringMessage('phone_number')} ${containedMessage('body')}`;
exports.assistanceTypeInBody = `${stringMessage(
  'assistance_type'
)}, must be one of 'emergency' or 'counseling' ${containedMessage('body')}`;
exports.victimFirstNameInBody = `${stringMessage('victim.first_name')} ${containedMessage('body')}`;
exports.victimLastNameInBody = `${stringMessage('victim.last_name')} ${containedMessage('body')}`;
exports.victimIdentificationCodeInBody = `${stringMessage('victim.identification_code')} ${containedMessage(
  'body'
)}`;
exports.victimPhoneNumberInBody = `${stringMessage('victim.phone_number')} ${containedMessage('body')}`;
exports.victimAddressInBody = `${stringMessage('victim.address')} ${containedMessage('body')}`;
exports.victimBirthDateInBody = `${dateMessage('victim.birth_date')} ${containedMessage('body')}`;
exports.victimAgeInBody = `${integerMessage('victim.age')} ${containedMessage('body')}`;
exports.victimSexInBody = `${stringMessage('victim.sex')} ${containedMessage('body')}`;
// eslint-disable-next-line id-length
exports.victimIdentificationTypeIdInBody = `${integerMessage(
  'victim.identification_type_id'
)} ${containedMessage('body')}`;
exports.victimCityIdInBody = `${integerMessage('victim.city_id')} ${containedMessage('body')}`;
exports.callIssueAddressInBody = `${stringMessage('call.issue_address')} ${containedMessage('body')}`;
exports.callComplaintReasonIdInBody = `${integerMessage('call.complaint_reason_id')} ${containedMessage(
  'body'
)}`;
exports.callOriginTypeIdInBody = `${integerMessage('call.origin_type_id')} ${containedMessage('body')}`;
exports.callViolenceTypesInBody = `${arrayMessage('call.violence_types_ids')} ${containedMessage('body')}`;
exports.derivationTypesIdsInBody = `${arrayMessage('derivation_types')} ${containedMessage('body')}`;
exports.firstCallInBody = `${booleanMessage('first_call')} ${containedMessage('body')}`;
exports.femicideRiskInBody = `${booleanMessage('femicide_risk')} ${containedMessage('body')}`;
exports.codeInBody = `${booleanMessage('code')} ${containedMessage('body')}`;
exports.datetimeInBody = `${dateMessage('datetime')} ${containedMessage('body')}`;
