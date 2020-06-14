const { Router: createRouter } = require('express');
const { checkTokenAndSetUser, checkPermissions } = require('../middlewares/authorization');
const { createUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/users');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const {
  getUsersSchema,
  createUserSchema,
  getUserSchema,
  updateUserSchema,
  deleteUserSchema
} = require('../schemas/users');

const userRouter = createRouter();

exports.init = app => {
  app.use('/users', userRouter);
  userRouter.get(
    '/',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(getUsersSchema),
    getUsers
  );
  userRouter.post(
    '/',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(createUserSchema),
    createUser
  );
  userRouter.get(
    '/:id',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(getUserSchema),
    getUser
  );
  userRouter.put(
    '/:id',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(updateUserSchema),
    updateUser
  );
  userRouter.delete(
    '/:id',
    checkTokenAndSetUser,
    checkPermissions,
    validateSchemaAndFail(deleteUserSchema),
    deleteUser
  );
};
