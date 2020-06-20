const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  changePassword
} = require('../services/users');
const {
  getUsersMapper,
  createUserMapper,
  getUserMapper,
  updateUserMapper,
  deleteUserMapper,
  changePasswordMapper
} = require('../mappers/users');
const { paginateResponse } = require('../serializers/paginations');
const { getUserSerializer } = require('../serializers/users');

exports.getUsers = (req, res, next) => {
  const filters = getUsersMapper(req);
  return getUsers(filters)
    .then(({ count, rows }) => res.status(200).send(paginateResponse({ ...filters, count, data: rows })))
    .catch(next);
};

exports.createUser = (req, res, next) =>
  createUser(createUserMapper(req))
    .then(() => res.status(201).end())
    .catch(next);

exports.getUser = (req, res, next) =>
  getUserById(getUserMapper(req))
    .then(user => res.status(200).send(getUserSerializer(user)))
    .catch(next);

exports.updateUser = (req, res, next) => {
  const newAttributes = updateUserMapper(req);
  return updateUser(newAttributes)
    .then(() => res.status(204).end())
    .catch(next);
};

exports.deleteUser = (req, res, next) =>
  deleteUser(deleteUserMapper(req))
    .then(() => res.status(204).end())
    .catch(next);

exports.changePassword = (req, res, next) =>
  changePassword(changePasswordMapper(req))
    .then(() => res.status(204).end())
    .catch(next);
