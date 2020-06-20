const { invalidToken, notFound, unauthorized } = require('../errors/builders');
const { getTokenBlacklistBy } = require('../services/tokens_black_list');
const { getUserById } = require('../services/users');
const { verifyAccessToken } = require('../services/sessions');
const {
  USER_ROLES: { ADMIN }
} = require('../utils/constants');

exports.checkTokenAndSetUser = (req, _, next) =>
  getTokenBlacklistBy({ accessToken: req.headers.authorization }).then(tokenInvalidated => {
    if (tokenInvalidated) return next(invalidToken('The provided token was invalidated'));
    return verifyAccessToken(req.headers.authorization)
      .then(decodedToken => {
        if (decodedToken.token_use !== 'access') {
          return next(invalidToken('The provided token is not an access token'));
        }
        return getUserById({ id: decodedToken.sub }).then(user => {
          if (!user) return next(notFound('User not found'));
          req.user = user.dataValues;
          return next();
        });
      })
      .catch(err => next(invalidToken(err.message)));
  });

exports.checkPermissions = ({ user }, _, next) => (user.rol === ADMIN ? next() : next(unauthorized()));
