const { healthCheck } = require('../controllers/health_check');
const usersRoute = require('./users');
const crudRouter = require('./crud');
const {
  City,
  ComplaintReason,
  DerivationType,
  Disability,
  OriginType,
  RelationshipType,
  RepresentativeType,
  ViolenceType,
  VulnerablePopulation,
  IdentificationType
} = require('../models');

exports.init = app => {
  app.get('/health', healthCheck);
  const crudRoutes = [
    { path: '/cities', model: City },
    { path: '/complaint-reasons', model: ComplaintReason },
    { path: '/derivation-types', model: DerivationType },
    { path: '/disabilities', model: Disability },
    { path: '/origin-types', model: OriginType },
    { path: '/relationship-types', model: RelationshipType },
    { path: '/representative-types', model: RepresentativeType },
    { path: '/violence-types', model: ViolenceType },
    { path: '/vulnerable-populations', model: VulnerablePopulation },
    { path: '/identification-types', model: IdentificationType }
  ];
  crudRoutes.forEach(crudRoute => crudRouter.init(app, crudRoute));
  const routes = [usersRoute];
  routes.forEach(route => route.init(app));
};
