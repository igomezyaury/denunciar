const {
  getAssistances,
  createAssistance,
  getAssistanceById,
  deleteAssistance,
  updateAssistance,
  countByDerivationType,
  countByViolenceType,
  countByOriginType,
  countByVulnerablePopulation
} = require('../services/assistances');
const {
  getAssistancesMapper,
  createAssistanceMapper,
  getAssistanceMapper,
  deleteAssistanceMapper,
  updateAssistanceMapper,
  dateAssistanceMapper
} = require('../mappers/assistances');
const { getAssistanceSerializer, getAssistancesSerializer } = require('../serializers/assistances');
const { objectToSnakeCase } = require('../utils/objects');
const { omit } = require('../utils/lodash');

exports.getAssistances = (req, res, next) => {
  const filters = getAssistancesMapper(req);
  return getAssistances(filters)
    .then(({ count, rows }) =>
      res.status(200).send(getAssistancesSerializer({ ...filters, count, data: rows }))
    )
    .catch(next);
};

exports.createAssistance = (req, res, next) =>
  createAssistance(createAssistanceMapper(req))
    .then(() => res.status(201).end())
    .catch(next);

exports.getAssistance = (req, res, next) =>
  getAssistanceById(getAssistanceMapper(req))
    .then(user => res.status(200).send(getAssistanceSerializer(user)))
    .catch(next);

exports.deleteAssistance = (req, res, next) =>
  deleteAssistance(deleteAssistanceMapper(req))
    .then(() => res.status(204).end())
    .catch(next);

exports.updateAssistance = (req, res, next) => {
  const newAttributes = updateAssistanceMapper(req);
  return updateAssistance(newAttributes)
    .then(() => res.status(204).end())
    .catch(next);
};

function getObjectToSnakeCase(stats) {
  return stats.map(element => objectToSnakeCase(omit(element.dataValues, ['deletedAt'])));
}

exports.countByDerivationType = (req, res, next) => {
  countByDerivationType(dateAssistanceMapper(req))
    .then(stats => res.status(200).send(getObjectToSnakeCase(stats)))
    .catch(next);
};

exports.countByViolenceType = (req, res, next) => {
  countByViolenceType(dateAssistanceMapper(req))
    .then(stats => res.status(200).send(getObjectToSnakeCase(stats)))
    .catch(next);
};

exports.countByOriginType = (req, res, next) => {
  countByOriginType(dateAssistanceMapper(req))
    .then(stats => res.status(200).send(getObjectToSnakeCase(stats)))
    .catch(next);
};

exports.countByVulnerablePopulation = (req, res, next) => {
  countByVulnerablePopulation(dateAssistanceMapper(req))
    .then(stats => res.status(200).send(getObjectToSnakeCase(stats)))
    .catch(next);
};
