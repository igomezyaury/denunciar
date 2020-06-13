const { Router: createRouter } = require('express');
const usersController = require('../controllers/users');
const { validateSchemaAndFail } = require('../middlewares/params_validator');
const { getUsersSchema } = require('../schemas/users');

const userRouter = createRouter();

exports.init = app => {
  app.use('/users', userRouter);
  userRouter.get('/', validateSchemaAndFail(getUsersSchema), usersController.getUsers);
};
