const {
  getAssistances,
  createAssistance,
  getAssistanceById,
  deleteAssistance
} = require('../services/assistances');
const {
  getAssistancesMapper,
  createAssistanceMapper,
  getAssistanceMapper,
  deleteAssistanceMapper
} = require('../mappers/assistances');
const { getAssistanceSerializer, getAssistancesSerializer } = require('../serializers/assistances');

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
