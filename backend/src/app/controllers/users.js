const { getUsers } = require('../services/users');
const { getUsersMapper } = require('../mappers/users');
const { paginateResponse } = require('../serializers/paginations');

exports.getUsers = (req, res, next) => {
  const filters = getUsersMapper(req);
  return getUsers(filters)
    .then(({ count, rows }) => res.status(200).send(paginateResponse({ ...filters, count, data: rows })))
    .catch(next);
};
