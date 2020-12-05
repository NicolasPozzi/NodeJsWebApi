'use strict';
module.exports = function(app) {
  var temperature = require('../controllers/temperatureController');

  app.route('/temp')
    .get(temperature.temperature);
};
