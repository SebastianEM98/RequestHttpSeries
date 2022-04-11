const express = require('express');
const series_tv_routes = require('./series_tv.routes');

const routerApi = (app)  => {
  const dynamic_routes = express.Router();
  /* http://localhost:5000/api/v3 */
  app.use('/api/v3', dynamic_routes);

  /* http://localhost:5000/api/v3/series */
  dynamic_routes.use('/series', series_tv_routes);
};

module.exports = routerApi;