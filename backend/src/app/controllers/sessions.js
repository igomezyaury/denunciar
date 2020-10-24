const { getUserBy } = require('../services/users');
const { notFound, invalidCredentials, blockedUser } = require('../errors/builders');
const { generateTokens, verifyAndCreateToken, comparePassword } = require('../services/sessions');
const { updateUser } = require('../services/users');
const { login, refresh } = require('../serializers/sessions');
const { createTokenBlacklist } = require('../services/tokens_black_list');

exports.login = (req, res, next) =>
  getUserBy({ email: req.body.email })
    .then(user => {
      if (!user) throw notFound('User not found');
      if (!user.active) throw blockedUser();
      return comparePassword(req.body.password, user.password).then(match => {
        if (!match) {
          const attempts = ++user.failedLoginAttempts;
          const active = attempts < 3 && user.active;
          return updateUser({ id: user.id, failedLoginAttempts: attempts < 3 ? attempts : 0, active }).then(
            () => {
              throw invalidCredentials();
            }
          );
        }
        return generateTokens({ user, req }).then(([accessToken, refreshToken, accessExpirationDate]) =>
          res.status(200).send(login({ accessToken, refreshToken, accessExpirationDate, user: { firstName: user.firstName, lastName: user.lastName, rol: user.rol } }))
        );
      });
    })
    .catch(next);

exports.logout = (req, res, next) =>
  createTokenBlacklist({ accessToken: req.headers.authorization })
    .then(() => res.status(204).end())
    .catch(next);

exports.refresh = (req, res, next) =>
  verifyAndCreateToken({ type: 'refresh', req })
    .then(newAccessToken =>
      createTokenBlacklist({ accessToken: req.headers.authorization }).then(() =>
        res.status(200).send(refresh({ accessToken: newAccessToken, refreshToken: req.body.refresh_token }))
      )
    )
    .catch(next);
