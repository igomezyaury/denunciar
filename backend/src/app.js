const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const { init } = require('./app/routes');
const { handle } = require('./app/middlewares/errors');
const documentation = require('./documentation');
const { logRequests } = require('./app/middlewares/logger_requests');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(documentation));
app.use(logRequests);

init(app);
app.use(handle);
module.exports = app;
