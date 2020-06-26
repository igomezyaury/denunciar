const integerMessage = field => `${field} must be an integer`;
const containedMessage = location => `and be contained in ${location}`;
const stringMessage = field => `${field} must be a string`;
const booleanMessage = field => `${field} must be a boolean`;
const dateMessage = field => `${field} must be a date (YYYY-MM-DD)`;
const jwtMessage = (field, location = 'headers') =>
  `${field} must be a jwt token and must be contained in ${location}`;
const tokenMessage = field => `${field} must be a jwt token`;

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
