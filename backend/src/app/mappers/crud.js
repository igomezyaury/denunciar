const { pagination, addCommonProperties, ID, ACTIVE, OPTIONAL_ACTIVE, NAME } = require('./common');

exports.getManyMapper = req => ({
  ...pagination(req)
});

exports.getOneMapper = req => addCommonProperties({}, req, [ID]);

exports.createOneMapper = req => addCommonProperties({}, req, [OPTIONAL_ACTIVE, NAME]);

exports.updateOneMapper = req => addCommonProperties({}, req, [ACTIVE, NAME, ID]);

exports.deleteOneMapper = req => addCommonProperties({}, req, [ID]);
