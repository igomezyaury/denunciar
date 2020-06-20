const { idInPath, nameInBody, activeInBody } = require('../errors/schema_messages');

exports.OPTIONAL_ACTIVE = 'optional_active';
exports.ACTIVE = 'active';
exports.NAME = 'name';
exports.ID = 'id';

const addOptionalActiveProperty = schema => {
  schema.active = {
    in: ['body'],
    isBoolean: true,
    optional: true,
    toBoolean: true
  };
  return schema;
};

const addActiveProperty = schema => {
  schema.active = {
    in: ['body'],
    isBoolean: true,
    toBoolean: true,
    errorMessage: activeInBody
  };
  return schema;
};

const addNameProperty = schema => {
  schema.name = {
    in: ['body'],
    isString: true,
    trim: true,
    errorMessage: nameInBody
  };
  return schema;
};

const addIdProperty = schema => {
  schema.id = {
    in: ['params'],
    isInt: true,
    toInt: true,
    trim: true,
    errorMessage: idInPath
  };
  return schema;
};

exports.addCommonProperties = (schema, props) => {
  if (props.includes(this.ID)) {
    addIdProperty(schema);
  }
  if (props.includes(this.NAME)) {
    addNameProperty(schema);
  }
  if (props.includes(this.ACTIVE)) {
    addActiveProperty(schema);
  }
  if (props.includes(this.OPTIONAL_ACTIVE)) {
    addOptionalActiveProperty(schema);
  }
  return schema;
};
