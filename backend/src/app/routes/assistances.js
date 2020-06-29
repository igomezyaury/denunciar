const { Router: createRouter } = require('express');
const { checkTokenAndSetUser } = require('../middlewares/authorization');
const {
  createAssistance,
  getAssistances,
  getAssistance,
  deleteAssistance,
  updateAssistance
} = require('../controllers/assistances');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const {
  getAssistancesSchema,
  createAssistanceSchema,
  getAssistanceSchema,
  deleteAssistanceSchema,
  updateAssistanceSchema
} = require('../schemas/assistances');

const assistancesRouter = createRouter();

exports.init = app => {
  app.use('/assistances', assistancesRouter);
  assistancesRouter.get(
    '/',
    checkTokenAndSetUser,
    validateSchemaAndFail(getAssistancesSchema),
    getAssistances
  );
  assistancesRouter.post(
    '/',
    checkTokenAndSetUser,
    validateSchemaAndFail(createAssistanceSchema),
    createAssistance
  );
  assistancesRouter.get(
    '/:id',
    checkTokenAndSetUser,
    validateSchemaAndFail(getAssistanceSchema),
    getAssistance
  );
  assistancesRouter.delete(
    '/:id',
    checkTokenAndSetUser,
    validateSchemaAndFail(deleteAssistanceSchema),
    deleteAssistance
  );
  assistancesRouter.put(
    '/:id',
    checkTokenAndSetUser,
    validateSchemaAndFail(updateAssistanceSchema),
    updateAssistance
  );
};
