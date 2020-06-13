const pagination = require('./pagination');
const { User } = require('../models');

exports.getUsersSchema = {
  ...pagination(User)
};
