const { inspect } = require('util');
const { notFound } = require('../errors/builders');
const {
  getManyMapper,
  getOneMapper,
  createOneMapper,
  updateOneMapper,
  deleteOneMapper
} = require('../mappers/crud');
const { getOneSerializer } = require('../serializers/crud');
const { paginateResponse } = require('../serializers/paginations');
const { getMany, getOne, createOne, updateOne, deleteOne } = require('../services/crud');

exports.getMany = model => (req, res, next) => {
  const filters = getManyMapper(req);
  return getMany(model, filters)
    .then(({ count, rows }) => res.status(200).send(paginateResponse({ ...filters, count, data: rows })))
    .catch(next);
};

exports.getOne = model => (req, res, next) =>
  getOne(model, getOneMapper(req))
    .then(obj => {
      if (!obj) {
        throw notFound(`${inspect(model)} not found`);
      }
      return res.status(200).send(getOneSerializer(obj));
    })
    .catch(next);

exports.createOne = model => (req, res, next) =>
  createOne(model, createOneMapper(req))
    .then(() => res.status(201).end())
    .catch(next);

exports.updateOne = model => (req, res, next) => {
  const newAttributes = updateOneMapper(req);
  return updateOne(model, newAttributes)
    .then(() => res.status(204).end())
    .catch(next);
};

exports.deleteOne = model => (req, res, next) =>
  deleteOne(model, deleteOneMapper(req))
    .then(() => res.status(204).end())
    .catch(next);
