const { objectToSnakeCase } = require('../utils/objects');
const { omit } = require('../utils/lodash');

exports.getCitySerializer = city => ({
  ...objectToSnakeCase(omit(city.dataValues, ['password', 'deletedAt']))
});
