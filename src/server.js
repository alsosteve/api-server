'use strict';

const express = require('express');

const app = express();

const logger = require('./middleware/logger.js');
const test = require('./routes/test');
const foodRoutes = require('./routes/food.js');
const clothesRoutes = require('./routes/clothes.js');
// error imports
const notFound = require('./error-handlers/404.js');
const serverError = require('./error-handlers/500.js');


app.use(express.json());
app.use(logger);
app.get('/', test); // proof of life

app.use(foodRoutes);
app.use(clothesRoutes);

// errors
app.use(notFound);
// if all else fails
app.use(serverError);


module.exports = {
  start: function (port) {
    app.listen(port, () => {
      console.log('App is running on : ' + port);
    });
  },
  app,
};