const { healthCheck } = require('../controllers/health_check');

const usersRoute = require('./users');

exports.init = app => {
  app.get('/health', healthCheck);
  const routes = [usersRoute];
  routes.forEach(route => route.init(app));
};
