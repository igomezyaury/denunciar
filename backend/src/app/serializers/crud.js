const { objectToSnakeCase } = require('../utils/objects');
const { omit } = require('../utils/lodash');

exports.getOneSerializer = obj => ({
  ...objectToSnakeCase(omit(obj.dataValues, ['password', 'deletedAt']))
});
