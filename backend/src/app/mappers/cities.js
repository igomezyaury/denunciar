const { pagination, addCommonProperties, ID, ACTIVE, OPTIONAL_ACTIVE, NAME } = require('./common');

exports.getCitiesMapper = req => ({
  ...pagination(req)
});

exports.getCityMapper = req => addCommonProperties({}, req, [ID]);

exports.createCityMapper = req => addCommonProperties({}, req, [OPTIONAL_ACTIVE, NAME]);

exports.updateCityMapper = req => addCommonProperties({}, req, [ACTIVE, NAME, ID]);

exports.deleteCityMapper = req => addCommonProperties({}, req, [ID]);
