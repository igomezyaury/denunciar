const ENVIRONMENT = process.env.NODE_ENV || 'development';

// eslint-disable-next-line global-require
if (ENVIRONMENT !== 'production') require('dotenv').config();

const config = {
  common: {
    database: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      dialect: 'postgres',
      dialectOptions: {
        ssl: { require: true }
      }
    },
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT || 1024 * 1024 * 10,
      parameterLimit: process.env.API_PARAMETER_LIMIT || 10000,
      port: process.env.PORT
    },
    session: {
      secret: process.env.SECRET,
      hashingSalts: process.env.HASHING_SALTS,
      expirationUnitAccessToken: process.env.EXPIRATION_UNIT_ACCESS_TOKEN || 'hours',
      expirationUnitRefreshToken: process.env.EXPIRATION_UNIT_REFRESH_TOKEN || 'hours',
      expirationValueAccessToken: process.env.EXPIRATION_VALUE_ACCESS_TOKEN || 24,
      expirationValueRefreshToken: process.env.EXPIRATION_VALUE_REFRESH_TOKEN || 24
    }
  }
};

module.exports = config;
