const { paginateResponse } = require('./paginations');
const { objectToSnakeCase } = require('../utils/objects');
const { omit } = require('../utils/lodash');

const propsToOmit = [
  'victimId',
  'call.dataValues.id',
  'call.dataValues.createdAt',
  'call.dataValues.updatedAt',
  'call.dataValues.deletedAt',
  'call.dataValues.assistanceId',
  'call.dataValues.aggressor.dataValues.id',
  'call.dataValues.aggressor.dataValues.createdAt',
  'call.dataValues.aggressor.dataValues.updatedAt',
  'call.dataValues.aggressor.dataValues.deletedAt',
  'call.dataValues.aggressor.dataValues.callId',
  'call.dataValues.representative.dataValues.id',
  'call.dataValues.representative.dataValues.createdAt',
  'call.dataValues.representative.dataValues.updatedAt',
  'call.dataValues.representative.dataValues.deletedAt',
  'call.dataValues.representative.dataValues.callId',
  'victim.dataValues.id',
  'victim.dataValues.createdAt',
  'victim.dataValues.updatedAt',
  'victim.dataValues.deletedAt'
];

const omitForManyToManyRelations = assistance => {
  assistance.dataValues.call.dataValues.violenceTypes.map(violenceType => {
    violenceType.dataValues = omit(violenceType.dataValues, [
      'id',
      'active',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'violence_types_by_call'
    ]);
    return violenceType;
  });
  assistance.dataValues.victim.dataValues.disabilities.map(disability => {
    disability.dataValues = omit(disability.dataValues, [
      'id',
      'active',
      'createdAt',
      'updatedAt',
      'deletedAt',
      'disabilities_by_victim'
    ]);
    return disability;
  });
  return assistance;
};

// eslint-disable-next-line id-length
const caseFunctionForNestedProperties = assistance => {
  assistance.call.dataValues.aggressor = objectToSnakeCase(assistance.call.dataValues.aggressor.dataValues);
  assistance.call.dataValues.representative = objectToSnakeCase(
    assistance.call.dataValues.representative.dataValues
  );
  assistance.call = objectToSnakeCase(assistance.call.dataValues);
  assistance.victim = objectToSnakeCase(assistance.victim.dataValues);
  return assistance;
};

exports.getAssistancesSerializer = assistances => {
  assistances.data.map(omitForManyToManyRelations);
  assistances.propsToOmit = propsToOmit;
  const response = paginateResponse(assistances);
  response.data.map(caseFunctionForNestedProperties);
  return response;
};

exports.getAssistanceSerializer = assistance => {
  omitForManyToManyRelations(assistance);
  const result = objectToSnakeCase(omit(assistance.dataValues, propsToOmit));
  return caseFunctionForNestedProperties(result);
};
