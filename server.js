var express = require('express'),
app = express();
port = process.env.PORT || 80,
bodyParser = require('body-parser');
//DHT11 temperature sensor
var sensor = require('node-dht-sensor');

var io = require('socket.io')();
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./apiFolder/routes/temperatureRoutes'); //importing route
routes(app); //register the route

// app.use(function(req, res) {
//     res.status(404).send({url: req.originalUrl + ' not found'})
//   });
  
app.listen(port);


sensor.read(11, 4, function(err, temperature, humidity) {
    if (!err) {
        console.log('temp: ' + temperature.toFixed(1) + '°C, ' +
            'humidity: ' + humidity.toFixed(1) + '%'
        );
    }
});

io.on('connection', (client) => {
  
  client.on('subscribeToTimer', (interval) => {
    console.log("Rentrer dans subsribeToTimer");
    interval === undefined ? interval = 1000 : '';
    console.log('client is subscribing to timer with interval ', interval);
    setInterval(() => {
      //on envoit un event
      console.log("we sent an event");
      client.emit('timer', new Date());
    }, interval);
  });
  
})


console.log('CORS-enabled web server listening on port ' + port);