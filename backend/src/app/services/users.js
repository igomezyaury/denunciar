const { inspect } = require('util');
const logger = require('../logger');
const { User } = require('../models');
const { deleteUndefined } = require('../utils/objects');
const { databaseError } = require('../errors/builders');

exports.getUsers = params => {
  logger.info(`Attempting to get users with params: ${inspect(params)}`);
  const filters = {};
  const sequelizeOptions = {
    where: deleteUndefined(filters),
    offset: (params.pageNumber - 1) * params.pageSize,
    limit: params.pageSize,
    order: params.orderColumn ? [[params.orderColumn, params.orderSense || 'ASC']] : undefined
  };
  return User.findAndCountAll(sequelizeOptions).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting users, reason: ${err.message}`);
  });
};
