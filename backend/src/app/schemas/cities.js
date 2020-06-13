const pagination = require('./pagination');
const { addCommonProperties, ID, OPTIONAL_ACTIVE, NAME, ACTIVE } = require('./common');
const { City } = require('../models');

exports.getCitiesSchema = {
  ...pagination(City)
};

exports.getCitySchema = addCommonProperties({}, [ID]);

exports.createCitySchema = addCommonProperties({}, [OPTIONAL_ACTIVE, NAME]);

exports.updateCitySchema = addCommonProperties({}, [ACTIVE, ID, NAME]);

exports.deleteCitySchema = addCommonProperties({}, [ID]);
