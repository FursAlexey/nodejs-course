const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const loginRouter = require('./resources/login/login');
const httpRequestLogger = require('./loggers/httpRequestLogger');

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use((req, res, next) => {
  httpRequestLogger({
    method: req.method,
    url: req.headers.host + req.url,
    params: req.params,
    body: req.body
  });
  next();
});

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/login', loginRouter);

app.use((req, res) => {
  res.status(500).json('Internal Server Error');
});

module.exports = app;
