/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const dotenv = require('dotenv');
const { Model } = require('objection');
const cors = require('cors');

// setup socket.io
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

dotenv.config({ path: '.env' }); // don't move this line under routes

const routes = require('./app/routes');
const knex = require('./database/knex');
const middlewares = require('./app/http/middlewares');

Model.knex(knex);

const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(middlewares.me);

Object.keys(routes).map((route) => app.use('/', routes[route]));

app.use((req, res) => {
  res.send('Api not found');
});

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
