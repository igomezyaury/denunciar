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
      dialect: 'postgres'
    },
    api: {
      bodySizeLimit: process.env.API_BODY_SIZE_LIMIT || 1024 * 1024 * 10,
      parameterLimit: process.env.API_PARAMETER_LIMIT || 10000,
      port: process.env.PORT
    },
    rollbar: {
      accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
      environment: process.env.ROLLBAR_ENV
    },
    session: {
      header_name: 'authorization',
      secret: process.env.NODE_API_SESSION_SECRET,
      documentationToken: process.env.DOCUMENTATION_TOKEN
    },
    headers: {
      documentationTokenHeader: process.env.DOCUMENTATION_TOKEN_HEADER || 'X-documentation-token'
    }
  }
};

module.exports = config;
