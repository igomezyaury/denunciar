const { notFound } = require('../errors/builders');
const {
  getCitiesMapper,
  getCityMapper,
  createCityMapper,
  updateCityMapper,
  deleteCityMapper
} = require('../mappers/cities');
const { getCitySerializer } = require('../serializers/cities');
const { paginateResponse } = require('../serializers/paginations');
const { getCities, getCity, createCity, updateCity, deleteCity } = require('../services/cities');

exports.getCities = (req, res, next) => {
  const filters = getCitiesMapper(req);
  return getCities(filters)
    .then(({ count, rows }) => res.status(200).send(paginateResponse({ ...filters, count, data: rows })))
    .catch(next);
};

exports.getCity = (req, res, next) =>
  getCity(getCityMapper(req))
    .then(city => {
      if (!city) {
        throw notFound('City not found');
      }
      return res.status(200).send(getCitySerializer(city));
    })
    .catch(next);

exports.createCity = (req, res, next) =>
  createCity(createCityMapper(req))
    .then(() => res.status(201).end())
    .catch(next);

exports.updateCity = (req, res, next) => {
  const newAttributes = updateCityMapper(req);
  return updateCity(newAttributes)
    .then(() => res.status(204).end())
    .catch(next);
};

exports.deleteCity = (req, res, next) =>
  deleteCity(deleteCityMapper(req))
    .then(() => res.status(204).end())
    .catch(next);
