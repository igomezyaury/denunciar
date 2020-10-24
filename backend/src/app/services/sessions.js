const { inspect } = require('util');
const { uuid } = require('uuidv4');
const { hash, compare, genSalt } = require('bcryptjs');
const { promisifyAll } = require('bluebird');
const { signAsync, verifyAsync } = promisifyAll(require('jsonwebtoken'));
const {
  hashingSalts,
  expirationUnitAccessToken,
  expirationUnitRefreshToken,
  expirationValueAccessToken,
  expirationValueRefreshToken,
  secret
} = require('../../config').common.session;
const logger = require('../logger');
const { internalServerError, databaseError } = require('../errors/builders');
const { moment } = require('../utils/moment');

const getIss = req => `${req.protocol}://${req.get('host')}`;

exports.verifyAccessToken = token => verifyAsync(token, secret);

exports.hashPassword = password =>
  genSalt(parseInt(hashingSalts))
    .then(salt => hash(password, salt))
    .catch(err => {
      logger.error(inspect(err));
      throw internalServerError(err.message);
    });

exports.comparePassword = (password, hashedPassword) =>
  compare(password, hashedPassword).catch(err => {
    logger.error(inspect(err));
    throw internalServerError(err.message);
  });

exports.generateTokens = ({ req, user }) => {
  logger.info(`Attempting to generate tokens for the user with id: ${user.id}`);
  const iss = getIss(req);
  logger.info('Iss was generated successfully');
  const accessExpirationDate = moment()
    .clone()
    .add(parseInt(expirationValueAccessToken), expirationUnitAccessToken);
  const accessPromise = this.generateAccessToken(user, req, accessExpirationDate);
  const refreshPromise = signAsync(
    {
      token_use: 'refresh',
      nbf: moment().unix(),
      exp: moment()
        .clone()
        .add(expirationValueRefreshToken, expirationUnitRefreshToken)
        .unix()
    },
    secret,
    {
      issuer: iss,
      jwtid: uuid(),
      subject: `${user.id}`
    }
  );
  return Promise.all([accessPromise, refreshPromise, Promise.resolve(accessExpirationDate)]).catch(err => {
    logger.error(inspect(err));
    throw databaseError(`There was an error generating the tokens: ${err.message}`);
  });
};

exports.generateAccessToken = (user, req, accessExpirationDate) =>
  signAsync(
    {
      token_use: 'access',
      user_type: user.type,
      nbf: moment().unix(),
      exp: accessExpirationDate.unix()
    },
    secret,
    {
      issuer: getIss(req),
      jwtid: uuid(),
      subject: `${user.id}`
    }
  );

exports.verifyAndCreateToken = ({ req }) => {
  logger.info(
    `Attempting to verify token ${req.body.refresh_token} generated for the user with id :${req.user.id}`
  );
  return verifyAsync(req.body.refresh_token, secret)
    .then(() => {
      logger.info('Token verified successful');
      logger.info('Attempting to generate new access token');
      return signAsync(
        {
          token_use: 'access',
          user_type: req.user.type,
          nbf: moment().unix(),
          exp: moment()
            .clone()
            .add(parseInt(expirationValueAccessToken), expirationUnitAccessToken)
            .unix()
        },
        secret,
        {
          issuer: getIss(req),
          jwtid: uuid(),
          subject: `${req.user.id}`
        }
      );
    })
    .catch(err => {
      logger.error(inspect(err));
      throw databaseError(`There was an error generating the token: ${err.message}`);
    });
};
