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
  sequelizeInstance,
  DerivationType,
  sequelizePackage,
  OriginType
} = require('../models');
const { deleteUndefined } = require('../utils/objects');
const { omit } = require('../utils/lodash');
const { databaseError, internalServerError, notFound } = require('../errors/builders');

const includeForAssistance = [
  {
    model: DerivationType,
    as: 'derivationTypes'
  },
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
        return Assistance.create(attrs, {transaction}).then(assistance => {
          assistance.setDerivationTypes(attrs.derivationTypes, {transaction});
          attrs.call.assistanceId = assistance.id;
          return createCall(attrs.call, transaction).then(call => {
            attrs.call.aggressor.callId = call.id;
            if (attrs.call.representative.firstName) {
              attrs.call.representative.callId = call.id;
            }
            return Promise.all([
              createAggressor(attrs.call.aggressor, transaction),
              attrs.call.representative.firstName ? createRepresentative(attrs.call.representative, transaction) : Promise.resolve()
            ]).then(() =>
              Promise.all([
                attrs.victim.disabilities ? victim.setDisabilities(attrs.victim.disabilities, { transaction }) : Promise.resolve(),
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

exports.getAssistanceById = ({ id }, options = {}) => {
  logger.info(`Attempting to get assistance with id: ${inspect(id)}`);
  return Assistance.findByPk(id, {
    include: includeForAssistance,
    ...options
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

const updateEntity = (attributes, entity, options = {}) => {
  logger.info(`Attempting to update entity: ${inspect(entity.toString())} with attributes: ${inspect(attributes)}`);
  return entity.update(attributes, options).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`There was an error updating the entity: ${err.message}`);
  });
};

exports.updateAssistance = attributes => {
  logger.info(`Attempting to update assistance with attributes: ${inspect(attributes)}`);
  return sequelizeInstance.transaction(transaction =>
    this.getAssistanceById(attributes, { transaction }).then(assistance => {
      if (!assistance) throw notFound('The assistance was not found');
      const callAttrs = omit(attributes.call, ['representative', 'aggressor', 'violenceTypes']);
      const assistanceAttrs = omit(attributes, ['call', 'victim', 'userId', 'derivationTypes']);
      const victimAttrs = omit(attributes.victim, ['disabilities']);
      const aggressorAttrs = attributes.call.aggressor;
      const representativeAttrs = attributes.call.representative;
      const {victim, call} = assistance.dataValues;
      const {aggressor, representative} = call;
      const promises = [
        updateEntity(assistanceAttrs, assistance, { transaction }),
        updateEntity(aggressorAttrs, aggressor, { transaction }),
        representativeAttrs.firstName ? updateEntity(representativeAttrs, representative, { transaction }) : Promise.resolve(),
        updateEntity(callAttrs, call, { transaction }),
        updateEntity(victimAttrs, victim, { transaction }),
        attributes.victim.disabilities ? victim.setDisabilities(attributes.victim.disabilities, { transaction }) : Promise.resolve(),
        call.setViolenceTypes(attributes.call.violenceTypes, { transaction }),
        assistance.setDerivationTypes(attributes.derivationTypes, {transaction})
      ];
      return Promise.all(promises);
    })
  );
};

exports.countByDerivationType = params => {
  logger.info(`Attempting to count assistances by derivation type with params: ${inspect(params)}`);

  return DerivationType.findAll({
    where: {
      ...((params.fromDate || params.toDate) && {
        '$assistances.datetime$': {
          ...(params.fromDate && { [sequelizePackage.Op.gte]: params.fromDate }),
          ...(params.toDate && { [sequelizePackage.Op.lte]: params.toDate })
        }
      })
    },
    include: [
      {
        model: Assistance,
        as: 'assistances'
      }
    ],
    attributes: {
      include: [
        'DerivationType.id',
        [sequelizePackage.fn('COUNT', sequelizePackage.col('assistances.id')), 'AssistanceCount']
      ]
    },
    group: ['DerivationType.id'],
    having: sequelizePackage.where(
      sequelizePackage.fn('COUNT', sequelizePackage.col('assistances.id')),
      '>',
      0
    ),
    includeIgnoreAttributes: false,
    distinct: true
  });
};

exports.countByViolenceType = params => {
  logger.info(`Attempting to count assistances by violence type with params: ${inspect(params)}`);

  return ViolenceType.findAll({
    where: {
      ...((params.fromDate || params.toDate) && {
        '$calls->assistance.datetime$': {
          ...(params.fromDate && { [sequelizePackage.Op.gte]: params.fromDate }),
          ...(params.toDate && { [sequelizePackage.Op.lte]: params.toDate })
        }
      })
    },
    include: [
      {
        model: Call,
        as: 'calls',
        include: [
          {
            model: Assistance,
            as: 'assistance'
          }
        ]
      }
    ],
    attributes: {
      include: [
        'ViolenceType.id',
        [sequelizePackage.fn('COUNT', sequelizePackage.col('calls->assistance.id')), 'AssistanceCount']
      ]
    },
    group: ['ViolenceType.id'],
    having: sequelizePackage.where(
      sequelizePackage.fn('COUNT', sequelizePackage.col('calls->assistance.id')),
      '>',
      0
    ),
    includeIgnoreAttributes: false,
    distinct: true
  });
};

exports.countByOriginType = params => {
  logger.info(`Attempting to count assistances by origin type with params: ${inspect(params)}`);

  return OriginType.findAll({
    where: {
      ...((params.fromDate || params.toDate) && {
        '$calls->assistance.datetime$': {
          ...(params.fromDate && { [sequelizePackage.Op.gte]: params.fromDate }),
          ...(params.toDate && { [sequelizePackage.Op.lte]: params.toDate })
        }
      })
    },
    include: [
      {
        model: Call,
        as: 'calls',
        include: [
          {
            model: Assistance,
            as: 'assistance'
          }
        ]
      }
    ],
    attributes: {
      include: [
        'OriginType.id',
        [sequelizePackage.fn('COUNT', sequelizePackage.col('calls->assistance.id')), 'AssistanceCount']
      ]
    },
    group: ['OriginType.id'],
    having: sequelizePackage.where(
      sequelizePackage.fn('COUNT', sequelizePackage.col('calls->assistance.id')),
      '>',
      0
    ),
    includeIgnoreAttributes: false,
    distinct: true
  });
};
