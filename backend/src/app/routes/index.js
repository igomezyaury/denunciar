const { healthCheck } = require('../controllers/health_check');
const usersRoute = require('./users');
const sessionsRoute = require('./sessions');
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

exports.init = app => {
  app.get('/health', healthCheck);
  crudRoutes.forEach(crudRoute => crudRouter.init(app, crudRoute));
  const routes = [usersRoute, sessionsRoute];
  routes.forEach(route => route.init(app));
};
