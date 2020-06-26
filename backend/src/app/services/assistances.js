const { inspect } = require('util');
const logger = require('../logger');
const {
  Assistance,
  Call,
  Victim,
  Aggressor,
  Disability,
  Representative,
  ViolenceType,
  sequelizeInstance
} = require('../models');
const { deleteUndefined } = require('../utils/objects');
const { databaseError, internalServerError, notFound } = require('../errors/builders');

const includeForAssistance = [
  {
    model: Call,
    as: 'call',
    include: [
      {
        model: Aggressor,
        as: 'aggressor'
      },
      {
        model: Representative,
        as: 'representative'
      },
      {
        model: ViolenceType,
        as: 'violenceTypes'
      }
    ]
  },
  {
    model: Victim,
    as: 'victim',
    include: [
      {
        model: Disability,
        as: 'disabilities'
      }
    ]
  }
];

exports.getAssistances = params => {
  logger.info(`Attempting to get assistances with params: ${inspect(params)}`);
  const filters = {};
  const sequelizeOptions = {
    where: deleteUndefined(filters),
    offset: (params.pageNumber - 1) * params.pageSize,
    limit: params.pageSize,
    order: params.orderColumn ? [[params.orderColumn, params.orderSense || 'ASC']] : undefined,
    include: includeForAssistance
  };
  return Assistance.findAndCountAll(sequelizeOptions).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting assistances, reason: ${err.message}`);
  });
};

const createVictim = (victim, transaction) => Victim.create(victim, { transaction });
const createCall = (call, transaction) => Call.create(call, { transaction });
const createAggressor = (aggressor, transaction) => Aggressor.create(aggressor, { transaction });
const createRepresentative = (representative, transaction) =>
  Representative.create(representative, { transaction });

exports.createAssistance = attrs => {
  logger.info(`Attempting to create assistance with attributes: ${inspect(attrs)}`);
  return sequelizeInstance
    .transaction(transaction =>
      createVictim(attrs.victim, transaction).then(victim => {
        attrs.victimId = victim.id;
        return Assistance.create(attrs, { transaction }).then(({ id: assistanceId }) => {
          attrs.call.assistanceId = assistanceId;
          return createCall(attrs.call, transaction).then(call => {
            attrs.call.aggressor.callId = call.id;
            attrs.call.representative.callId = call.id;
            return Promise.all([
              createAggressor(attrs.call.aggressor, transaction),
              createRepresentative(attrs.call.representative, transaction)
            ]).then(() =>
              Promise.all([
                victim.setDisabilities(attrs.victim.disabilities, { transaction }),
                call.setViolenceTypes(attrs.call.violenceTypes, { transaction })
              ])
            );
          });
        });
      })
    )
    .catch(err => {
      logger.error(inspect(err));
      throw internalServerError(err.message);
    });
};

exports.getAssistanceById = ({ id }) => {
  logger.info(`Attempting to get assistance with id: ${inspect(id)}`);
  return Assistance.findByPk(id, {
    include: includeForAssistance
  }).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`Error getting a assistance, reason: ${err.message}`);
  });
};

exports.deleteAssistance = filters => {
  logger.info(`Attempting to delete assistance with filters: ${inspect(filters)}`);
  return this.getAssistanceById(filters)
    .then(assistance => {
      if (!assistance) {
        throw notFound('The assistance was not found');
      }
      return assistance.destroy();
    })
    .catch(err => {
      logger.error(inspect(err));
      throw databaseError(`There was an error deleting the assistance: ${err.message}`);
    });
};
