const { getModelKeys } = require('../utils/models');
const { pageSize, pageNumber, orderColumn, orderSense } = require('../errors/schema_messages');

module.exports = model => ({
  page_size: {
    in: ['query'],
    isInt: {
      options: { min: 1 }
    },
    toInt: true,
    optional: true,
    trim: true,
    errorMessage: pageSize
  },
  page_number: {
    in: ['query'],
    isInt: {
      options: { min: 1 }
    },
    toInt: true,
    optional: true,
    trim: true,
    errorMessage: pageNumber
  },
  order_column: {
    in: ['query'],
    isString: true,
    optional: true,
    trim: true,
    custom: {
      options: value => getModelKeys(model).includes(value.toLowerCase())
    },
    errorMessage: orderColumn
  },
  order_sense: {
    in: ['query'],
    isString: true,
    optional: true,
    trim: true,
    custom: { options: value => ['ASC', 'DESC'].includes(value && value.toUpperCase()) },
    errorMessage: orderSense
  }
});
