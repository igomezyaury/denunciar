const { Router: createRouter } = require('express');
const { checkTokenAndSetUser, checkPermissions } = require('../middlewares/authorization');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const { createOne, deleteOne, getMany, getOne, updateOne } = require('../controllers/crud');
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
  crudRouter.get(
    '/',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(getManySchema(model)),
    getMany(model)
  );
  crudRouter.get(
    '/:id',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(getOneSchema),
    getOne(model)
  );
  crudRouter.post(
    '/',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(createOneSchema),
    createOne(model)
  );
  crudRouter.put(
    '/:id',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(updateOneSchema),
    updateOne(model)
  );
  crudRouter.delete(
    '/:id',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(deleteOneSchema),
    deleteOne(model)
  );
};
