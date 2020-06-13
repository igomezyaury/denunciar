const { inspect } = require('util');
const logger = require('../logger');
const { City } = require('../models');
const { deleteUndefined } = require('../utils/objects');
const { databaseError, alreadyExist, internalServerError, notFound } = require('../errors/builders');

exports.getCities = params => {
  logger.info(`Attempting to get cities with params: ${inspect(params)}`);
  const filters = {};
  const sequelizeOptions = {
    where: deleteUndefined(filters),
    offset: (params.pageNumber - 1) * params.pageSize,
    limit: params.pageSize,
    order: params.orderColumn ? [[params.orderColumn, params.orderSense || 'ASC']] : undefined
  };
  return City.findAndCountAll(sequelizeOptions).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting cities, reason: ${err.message}`);
  });
};

exports.getCity = ({ id }) => {
  logger.info(`Attempting to get city with id: ${inspect(id)}`);
  return City.findByPk(id).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting city, reason: ${err.message}`);
  });
};

exports.createCity = attrs => {
  logger.info(`Attempting to create city with attributes: ${inspect(attrs)}`);
  return City.findCreateFind({ where: { name: attrs.name }, defaults: attrs })
    .catch(err => {
      logger.error(inspect(err));
      throw databaseError(`Error creating city, reason: ${err.message}`);
    })
    .then(([instance, created]) => {
      if (!created) throw alreadyExist('City already exist');
      return instance;
    })
    .catch(err => {
      logger.error(inspect(err));
      throw internalServerError(err.message);
    });
};

const updateCity = (attributes, city) =>
  city.update({ name: attributes.name, active: attributes.active }).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`There was an error updating the city: ${err.message}`);
  });

exports.updateCity = attributes => {
  logger.info(`Attempting to update city with attributes: ${inspect(attributes)}`);
  const options = {};
  return this.getCity(attributes, options).then(city => {
    if (!city) throw notFound('The city was not found');
    return updateCity(attributes, city);
  });
};

exports.deleteCity = filters => {
  logger.info(`Attempting to delete city with filters: ${inspect(filters)}`);
  return this.getCity(filters).then(city => {
    if (!city) {
      throw notFound('The city was not found');
    }
    return city.destroy().catch(err => {
      logger.error(inspect(err));
      throw databaseError(`There was an error deleting the city: ${err.message}`);
    });
  });
};
