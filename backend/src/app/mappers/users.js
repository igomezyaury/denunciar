const { pagination } = require('./common');

exports.getUsersMapper = req => ({
  ...pagination(req)
});
