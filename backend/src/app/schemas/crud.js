const pagination = require('./pagination');
const authorization = require('./authorizations');
const { addCommonProperties, ID, OPTIONAL_ACTIVE, NAME, ACTIVE } = require('./common');

exports.getManySchema = model => ({
  ...authorization,
  ...pagination(model)
});

exports.getOneSchema = addCommonProperties(
  {
    ...authorization
  },
  [ID]
);

exports.createOneSchema = addCommonProperties(
  {
    ...authorization
  },
  [OPTIONAL_ACTIVE, NAME]
);

exports.updateOneSchema = addCommonProperties(
  {
    ...authorization
  },
  [ACTIVE, ID, NAME]
);

exports.deleteOneSchema = addCommonProperties(
  {
    ...authorization
  },
  [ID]
);
