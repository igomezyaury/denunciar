const pagination = require('./pagination');
const { addCommonProperties, ID, OPTIONAL_ACTIVE, NAME, ACTIVE } = require('./common');

exports.getManySchema = model => ({ ...pagination(model) });

exports.getOneSchema = addCommonProperties({}, [ID]);

exports.createOneSchema = addCommonProperties({}, [OPTIONAL_ACTIVE, NAME]);

exports.updateOneSchema = addCommonProperties({}, [ACTIVE, ID, NAME]);

exports.deleteOneSchema = addCommonProperties({}, [ID]);
