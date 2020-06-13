const { Router: createRouter } = require('express');
const citiesController = require('../controllers/cities');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const { getCitiesSchema, getCitySchema, createCitySchema, updateCitySchema, deleteCitySchema } = require('../schemas/cities');

const citiesRouter = createRouter();

exports.init = app => {
  app.use('/cities', citiesRouter);
  citiesRouter.get('/', validateSchemaAndFail(getCitiesSchema), citiesController.getCities);
  citiesRouter.get('/:id', validateSchemaAndFail(getCitySchema), citiesController.getCity);
  citiesRouter.post('/', validateSchemaAndFail(createCitySchema), citiesController.createCity);
  citiesRouter.put('/:id', validateSchemaAndFail(updateCitySchema), citiesController.updateCity);
  citiesRouter.delete('/:id', validateSchemaAndFail(deleteCitySchema), citiesController.deleteCity);
};
