const { objectToSnakeCase } = require('../utils/objects');

const commonSerializer = tokens => objectToSnakeCase(tokens);

exports.login = response => ({...commonSerializer(response), user: {...commonSerializer(response.user)}})

exports.refresh = commonSerializer;
