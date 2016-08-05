'use strict';

// import core modules:
const express = require('express');
const dotenv = require('dotenv-safe');

// import app modules:
const ConfigDatabase = require('./config/database')
const ConfigModels = require('./config/models')
const ConfigExpress = require('./config/express')
const ConfigPassport = require('./config/passport')
const ConfigRoutes = require('./config/routes')

// Load environment variables from .env file, where API keys and passwords are configured.
dotenv.load()

// create express server
const app = express()

// configure different parts of app:
ConfigDatabase.init(app) 
ConfigModels.init(app)
ConfigExpress.init(app)
ConfigPassport.init(app)
ConfigRoutes.init(app)

// Start Express server.
app.listen(app.get('port'), () => {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
