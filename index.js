var rpio = require('rpio');
const express = require('express');
var io = require('socket.io')(3001);
const app = express();

const STATUS_PIN = 11;

app.use(express.static('public'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/stall', (req, res) => {
  const status = Boolean(rpio.read(STATUS_PIN));
  console.log(`${req.connection.remoteAddress} // Status: ${status}`);
  res.send({occupied: status});
});

rpio.open(STATUS_PIN, rpio.INPUT);

setInterval(() => {
  io.emit(Boolean(rpio.read(STATUS_PIN)));
}, 500)

app.listen(3000, () => {
  console.log('stall-monitor is "Watching the Stall"');
});