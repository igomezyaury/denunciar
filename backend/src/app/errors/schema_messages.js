const integerMessage = field => `${field} must be an integer`;
const containedMessage = location => `and be contained in ${location}`;
const stringMessage = field => `${field} must be a string`;
const booleanMessage = field => `${field} must be a boolean`;

exports.orderSense = `order_sense must be asc o desc ${containedMessage('query')}`;
exports.orderColumn = `order_column must be a valid column ${containedMessage('query')}`;
exports.pageNumber = `${integerMessage('page_number')}, be greater than zero ${containedMessage('query')}`;
exports.pageSize = `${integerMessage('page_size')}, be greater than zero ${containedMessage('query')}`;
exports.idInPath = `${integerMessage('id')} ${containedMessage('path')}`;
exports.nameInBody = `${stringMessage('name')} ${containedMessage('body')}`;
exports.activeInBody = `${booleanMessage('active')} ${containedMessage('body')}`;
