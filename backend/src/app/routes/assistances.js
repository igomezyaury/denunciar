const { Router: createRouter } = require('express');
const { checkTokenAndSetUser, checkPermissions } = require('../middlewares/authorization');
const {
  createAssistance,
  getAssistances,
  getAssistance,
  deleteAssistance,
  updateAssistance,
  countByDerivationType,
  countByViolenceType,
  countByOriginType
} = require('../controllers/assistances');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const {
  getAssistancesSchema,
  createAssistanceSchema,
  getAssistanceSchema,
  deleteAssistanceSchema,
  updateAssistanceSchema,
  dateAssistanceSchema
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
    '/count-by-derivation-type',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(dateAssistanceSchema),
    countByDerivationType
  );
  assistancesRouter.get(
    '/count-by-violence-type',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(dateAssistanceSchema),
    countByViolenceType
  );
  assistancesRouter.get(
    '/count-by-origin-type',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(dateAssistanceSchema),
    countByOriginType
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
