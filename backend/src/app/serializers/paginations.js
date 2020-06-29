const { objectToSnakeCase } = require('../utils/objects');
const { omit } = require('../utils/lodash');

exports.paginateResponse = ({ data, count, pageNumber, pageSize, propsToOmit = [] }) => ({
  data: data.map(obj =>
    objectToSnakeCase(omit(obj.dataValues, ['password', 'deletedAt'].concat(propsToOmit)))
  ),
  total_count: count,
  total_pages: Math.ceil(count / pageSize),
  page_number: pageNumber,
  page_size: pageSize
});
