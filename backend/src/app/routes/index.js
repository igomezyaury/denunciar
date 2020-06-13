const { healthCheck } = require('../controllers/health_check');

const usersRoute = require('./users');
const citiesRoute = require('./cities');

exports.init = app => {
  app.get('/health', healthCheck);
  const routes = [usersRoute, citiesRoute];
  routes.forEach(route => route.init(app));
};
