const { inspect } = require('util');
const logger = require('../logger');
const { deleteUndefined } = require('../utils/objects');
const { databaseError, alreadyExist, internalServerError, notFound } = require('../errors/builders');

exports.getMany = (model, params) => {
  logger.info(`Attempting to get ${inspect(model.name)}s with params: ${inspect(params)}`);
  const filters = {};
  const sequelizeOptions = {
    where: deleteUndefined(filters),
    offset: (params.pageNumber - 1) * params.pageSize,
    limit: params.pageSize,
    order: params.orderColumn ? [[params.orderColumn, params.orderSense || 'ASC']] : undefined
  };
  return model.findAndCountAll(sequelizeOptions).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting ${inspect(model.name)}s, reason: ${err.message}`);
  });
};

exports.getOne = (model, { id }) => {
  logger.info(`Attempting to get ${inspect(model.name)} with id: ${inspect(id)}`);
  return model.findByPk(id).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting ${inspect(model.name)}, reason: ${err.message}`);
  });
};

exports.createOne = (model, attrs) => {
  logger.info(`Attempting to create ${inspect(model.name)} with attributes: ${inspect(attrs)}`);
  return model
    .findCreateFind({ where: { name: attrs.name }, defaults: attrs })
    .catch(err => {
      logger.error(inspect(err));
      throw databaseError(`Error creating ${inspect(model.name)}, reason: ${err.message}`);
    })
    .then(([instance, created]) => {
      if (!created) throw alreadyExist(`${inspect(model.name)} already exist`);
      return instance;
    })
    .catch(err => {
      logger.error(inspect(err));
      throw internalServerError(err.message);
    });
};

const updateOne = (model, attributes, obj) =>
  obj.update({ name: attributes.name, active: attributes.active }).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`There was an error updating the ${inspect(model.name)}: ${err.message}`);
  });

exports.updateOne = (model, attributes) => {
  logger.info(`Attempting to update ${inspect(model.name)} with attributes: ${inspect(attributes)}`);
  return this.getOne(model, attributes).then(obj => {
    if (!obj) throw notFound(`The ${inspect(model.name)} was not found`);
    return updateOne(model, attributes, obj);
  });
};

exports.deleteOne = (model, filters) => {
  logger.info(`Attempting to delete ${inspect(model.name)} with filters: ${inspect(filters)}`);
  return this.getOne(model, filters).then(obj => {
    if (!obj) {
      throw notFound(`The ${inspect(model.name)} was not found`);
    }
    return obj.destroy().catch(err => {
      logger.error(inspect(err));
      throw databaseError(`There was an error deleting the ${inspect(model.name)}: ${err.message}`);
    });
  });
};
