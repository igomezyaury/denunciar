const { Router: createRouter } = require('express');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const crudController = require('../controllers/crud');
const {
  getManySchema,
  getOneSchema,
  createOneSchema,
  updateOneSchema,
  deleteOneSchema
} = require('../schemas/crud');

exports.init = (app, { path, model }) => {
  const crudRouter = createRouter();
  app.use(path, crudRouter);
  crudRouter.get('/', validateSchemaAndFail(getManySchema(model)), crudController.getMany(model));
  crudRouter.get('/:id', validateSchemaAndFail(getOneSchema), crudController.getOne(model));
  crudRouter.post('/', validateSchemaAndFail(createOneSchema), crudController.createOne(model));
  crudRouter.put('/:id', validateSchemaAndFail(updateOneSchema), crudController.updateOne(model));
  crudRouter.delete('/:id', validateSchemaAndFail(deleteOneSchema), crudController.deleteOne(model));
};
