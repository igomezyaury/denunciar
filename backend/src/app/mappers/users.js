const { pagination, addCommonProperties, OPTIONAL_ACTIVE, ACTIVE, ID } = require('./common');
const {
  USER_ROLES: { NORMAL }
} = require('../utils/constants');

exports.getUsersMapper = req => ({
  ...pagination(req)
});

exports.createUserMapper = req =>
  addCommonProperties(
    {
      username: req.body.username,
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      identificationCode: req.body.identification_code,
      identificationTypeId: req.body.identification_type_id,
      birthDate: req.body.birth_date,
      email: req.body.email,
      password: req.body.password,
      rol: req.body.rol || NORMAL
    },
    req,
    [OPTIONAL_ACTIVE]
  );

exports.getUserMapper = req => addCommonProperties({}, req, [ID]);

exports.updateUserMapper = req =>
  addCommonProperties(
    {
      username: req.body.username,
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      identificationCode: req.body.identification_code,
      identificationTypeId: req.body.identification_type_id,
      birthDate: req.body.birth_date,
      email: req.body.email,
      rol: req.body.rol
    },
    req,
    [ACTIVE, ID]
  );

exports.deleteUserMapper = req => addCommonProperties({}, req, [ID]);

exports.changePasswordMapper = req =>
  addCommonProperties(
    {
      oldPassword: req.body.old_password,
      newPassword: req.body.new_password
    },
    req,
    [ID]
  );
