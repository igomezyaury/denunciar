const {inspect} = require('util');
const logger = require('../logger');
const {User} = require('../models');
const {deleteUndefined} = require('../utils/objects');
const {omit} = require('../utils/lodash');
const {databaseError, alreadyExist, internalServerError, notFound, invalidCredentials} = require('../errors/builders');
const {hashPassword, comparePassword} = require('./sessions');

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

exports.createUser = attrs => {
  logger.info(`Attempting to create user with attributes: ${inspect(omit(attrs, ['password']))}`);
  return hashPassword(attrs.password)
    .then(hash =>
      User.findCreateFind({where: {email: attrs.email}, defaults: {...attrs, password: hash}})
        .catch(err => {
          logger.error(inspect(err));
          throw databaseError(`Error creating a user, reason: ${err.message}`);
        })
        .then(([instance, created]) => {
          if (!created) throw alreadyExist('User already exist');
          return instance;
        })
    )
    .catch(err => {
      logger.error(inspect(err));
      throw internalServerError(err.message);
    });
};

exports.getUserBy = filters => {
  logger.info(`Attempting to get user with filters: ${inspect(filters)}`);
  return User.findOne({where: filters}).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting a user, reason: ${err.message}`);
  });
};

exports.getUserById = ({id}) => {
  logger.info(`Attempting to get user with id: ${inspect(id)}`);
  return User.findByPk(id).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting a user, reason: ${err.message}`);
  });
};

const updateUser = (attributes, user) =>
  user.update(attributes).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`There was an error updating the user: ${err.message}`);
  });

exports.updateUser = attributes => {
  logger.info(`Attempting to update user with attributes: ${inspect(omit(attributes, ['password']))}`);
  return this.getUserById(attributes).then(user => {
    if (!user) throw notFound('The user was not found');
    const hashFunction = attributes.password && hashPassword || (() => Promise.resolve());
    return hashFunction(attributes.password).then(hash => updateUser({password: hash, ...omit(attributes, ['password'])}, user));
  });
};

exports.deleteUser = filters => {
  logger.info(`Attempting to delete user with filters: ${inspect(filters)}`);
  return this.getUserById(filters)
    .then(user => {
      if (!user) {
        throw notFound('The user was not found');
      }
      return user.destroy();
    })
    .catch(err => {
      logger.error(inspect(err));
      throw databaseError(`There was an error deleting the user: ${err.message}`);
    });
};

exports.changePassword = attrs => {
  logger.info(
    `Attempting to change password with attributes: ${inspect(omit(attrs, ['oldPassword', 'newPassword']))}`
  );
  return this.getUserById(attrs)
    .then(user => {
      if (!user) {
        throw notFound('The user was not found');
      }
      return comparePassword(attrs.oldPassword, user.password).then(match => {
        if (!match) throw invalidCredentials();
        return hashPassword(attrs.newPassword).then(hash => updateUser({password: hash}, user));
      });
    })
    .catch(err => {
      logger.error(inspect(err));
      throw databaseError(`There was an error changing password: ${err.message}`);
    });
};
